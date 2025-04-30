'use client';

import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FlowFormData } from '../schemas/createFlow';

export default function Section1() {
    const {
        register,
        formState: { errors },
    } = useFormContext<FlowFormData>();

    return (
        <>
            <TextField
                fullWidth
                label="Título"
                {...register('section1.title')}
                error={!!errors.section1?.title}
                helperText={errors.section1?.title?.message}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Descripción"
                {...register('section1.description')}
                error={!!errors.section1?.description}
                helperText={errors.section1?.description?.message}
                margin="normal"
            />
        </>
    );
}
