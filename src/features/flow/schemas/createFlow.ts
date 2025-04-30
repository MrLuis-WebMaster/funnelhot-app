import { z } from 'zod';

export const section1Schema = z.object({
    title: z.string().min(1, 'Título requerido'),
    description: z.string().min(1, 'Descripción requerida'),
});

export const section2Schema = z.object({
    mediaTitle: z.string().min(1, 'Título requerido'),
    mediaFile: z
        .any()
        .refine((file) => file instanceof File && file.size > 0, 'Debe seleccionar un archivo'),
});

export const section3Schema = z.object({
    actionText: z.string().min(1, 'Texto requerido'),
    actionUrl: z.string().url('Debe ser una URL válida'),
});

export const fullFlowSchema = z.object({
    section1: section1Schema,
    section2: section2Schema,
    section3: section3Schema,
});

export type FlowFormData = z.infer<typeof fullFlowSchema>;
