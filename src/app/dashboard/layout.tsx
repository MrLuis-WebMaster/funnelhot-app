import { Box, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

const drawerWidth = 240;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <List>
                    <ListItemButton component={Link} href="/dashboard">
                        <ListItemText primary="Inicio" />
                    </ListItemButton>
                    <ListItemButton component={Link} href="/dashboard/flow/new">
                        <ListItemText primary="Nuevo flujo" />
                    </ListItemButton>
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
}
