'use client';

import { Tabs, Tab, Box, Button } from '@mui/material';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFlowStore } from '../store/flowStore';
import { createFlow } from '../services/flowService';
import { useRouter } from 'next/navigation';

import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import { FlowFormData, fullFlowSchema } from '../schemas/createFlow';

export default function FormTabs() {
    const [tab, setTab] = useState(0);
    const methods = useForm<FlowFormData>({
        resolver: zodResolver(fullFlowSchema),
        defaultValues: {
            section1: { title: '', description: '' },
            section2: { mediaTitle: '', mediaFile: null },
            section3: { actionText: '', actionUrl: '' },
        },
    });

    const { reset: resetStore, updateSection } = useFlowStore();
    const router = useRouter();

    const nextStep = async () => {
        const section = ['section1', 'section2', 'section3'][tab] as keyof FlowFormData;
        const valid = await methods.trigger(section);
        if (valid) setTab((t) => t + 1);
    };

    const prevStep = () => setTab((t) => t - 1);

    const handleCreate = methods.handleSubmit(async (formData) => {
        Object.entries(formData).forEach(([key, value]) => {
            if (key in formData) {
                return updateSection(key as keyof FlowFormData, value);
            }
        });

        const { id } = await createFlow(formData);
        resetStore();
        router.push(`/dashboard/flow/${id}`);
    });

    return (
        <FormProvider {...methods}>
            <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)} sx={{ mb: 2 }}>
                <Tab label="Sección 1" />
                <Tab label="Sección 2" />
                <Tab label="Sección 3" />
            </Tabs>

            <Box>{tab === 0 && <Section1 />}</Box>
            <Box>{tab === 1 && <Section2 />}</Box>
            <Box>{tab === 2 && <Section3 />}</Box>

            <Box display="flex" justifyContent="space-between" mt={4}>
                <Button onClick={prevStep} disabled={tab === 0}>
                    Atrás
                </Button>
                {tab < 2 ? (
                    <Button onClick={nextStep}>Siguiente</Button>
                ) : (
                    <Button variant="contained" onClick={handleCreate}>
                        Crear
                    </Button>
                )}
            </Box>
        </FormProvider>
    );
}
