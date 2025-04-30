'use client';

import { useFormContext } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FlowFormData } from '../schemas/createFlow';

export default function Section2() {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<FlowFormData>();

    const file = watch('section2.mediaFile');
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (file instanceof File) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }, [file]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setValue('section2.mediaFile', e.target.files[0], { shouldValidate: true });
        }
    };

    return (
        <Box>
            <TextField
                label="Título del archivo"
                fullWidth
                margin="normal"
                {...register('section2.mediaTitle')}
                error={!!errors.section2?.mediaTitle}
                helperText={errors.section2?.mediaTitle?.message}
            />

            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                Seleccionar archivo
                <input
                    type="file"
                    hidden
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                />
            </Button>

            {errors.section2?.mediaFile && (
                <Typography color="error" variant="body2">
                    {errors.section2.mediaFile.message?.toString()}
                </Typography>
            )}

            {preview && (
                <Box mt={2}>
                    {file?.type?.includes('video') ? (
                        <video src={preview} controls width="100%" />
                    ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={preview} alt="Vista previa" width="100%" style={{ borderRadius: 8 }} />
                    )}
                </Box>
            )}
        </Box>
    );
}
