'use client';

import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FlowFormData } from '../schemas/createFlow';

export default function Section3() {
    const {
        register,
        formState: { errors },
    } = useFormContext<FlowFormData>();

    return (
        <>
            <TextField
                fullWidth
                label="Texto del botón"
                {...register('section3.actionText')}
                error={!!errors.section3?.actionText}
                helperText={errors.section3?.actionText?.message}
                margin="normal"
            />
            <TextField
                fullWidth
                label="URL de acción"
                {...register('section3.actionUrl')}
                error={!!errors.section3?.actionUrl}
                helperText={errors.section3?.actionUrl?.message}
                margin="normal"
            />
        </>
    );
}
