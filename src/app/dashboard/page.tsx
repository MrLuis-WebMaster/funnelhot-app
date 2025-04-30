import FlowList from '@/features/flow/components/FlowList';
import { Typography, Box, Button, Divider } from '@mui/material';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardHome() {
    const auth = (await cookies()).get('auth_token');
    if (!auth) redirect('/auth/login');
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Bienvenido a tu panel
            </Typography>
            <Typography variant="body1" mb={3}>
                Aquí puedes crear y visualizar tus flujos automatizados.
            </Typography>
            <Button variant="contained" component={Link} href="/dashboard/flow/new" sx={{ mb: 4 }}>
                Crear nuevo flujo
            </Button>
            <Divider />
            <Typography variant="h6" mt={3} mb={1}>
                Tus flujos guardados
            </Typography>

            <FlowList />
        </Box>
    );
}
