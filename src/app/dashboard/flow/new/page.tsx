import { Container, Typography } from '@mui/material';
import FormTabs from '@/features/flow/components/FormTabs';

export default function FlowBuilderPage() {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" mb={2}>
                Crear nuevo flujo
            </Typography>
            <FormTabs />
        </Container>
    );
}
