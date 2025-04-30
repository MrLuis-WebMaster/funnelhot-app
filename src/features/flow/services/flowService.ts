import axios from 'axios';
import { FlowFormData } from '../schemas/createFlow';
import { FlowData } from '../flow.types';

export const createFlow = async (data: FlowFormData): Promise<{ id: string }> => {
    const mediaUrl = `https://placehold.co/600x400`;

    const payload = {
        section1: data.section1,
        section2: {
            mediaTitle: data.section2.mediaTitle,
            mediaUrl,
        },
        section3: data.section3,
    };

    const res = await axios.post('/api/flows', payload, {
        headers: { 'Content-Type': 'application/json' },
    });

    return res.data;
};

export const getFlowById = async (id: string): Promise<FlowData> => {
    const res = await axios.get(`/api/flows/${id}`);
    return res.data;
};

export const updateFlow = async (id: string, updated: FlowData): Promise<void> => {
    await axios.put(`/api/flows/${id}`, updated, {
        headers: { 'Content-Type': 'application/json' },
    });
};