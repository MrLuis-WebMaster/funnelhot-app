import { Container, Typography } from '@mui/material';
import FlowViewer from '@/features/flow/components/FlowViewer';

export default function FlowVisualPage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" mb={2}>
                Visualización del flujo
            </Typography>
            <FlowViewer />
        </Container>
    );
}
