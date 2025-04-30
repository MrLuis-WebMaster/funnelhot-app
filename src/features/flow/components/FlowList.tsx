'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, CircularProgress, ListItemButton } from '@mui/material';
import Link from 'next/link';

type Flow = {
    id: string;
    section1: { title: string };
    createdAt: string;
};

export default function FlowList() {
    const [flows, setFlows] = useState<Flow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/flows')
            .then((res) => setFlows(res.data))
            .catch(() => setFlows([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <CircularProgress />;

    if (flows.length === 0) {
        return <Typography variant="body2">No hay flujos creados.</Typography>;
    }

    return (
        <List>
            {flows.map((flow) => (
                <ListItem key={flow.id} disablePadding>
                    <Link href={`/dashboard/flow/${flow.id}`} passHref legacyBehavior>
                        <ListItemButton component="a">
                            <ListItemText
                                primary={flow.section1.title}
                                secondary={new Date(flow.createdAt).toLocaleString()}
                            />
                        </ListItemButton>
                    </Link>
                </ListItem>
            ))}
        </List>
    );
}
