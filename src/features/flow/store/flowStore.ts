import { create } from 'zustand';
import { FlowData, FlowState } from '../flow.types';

const initial: FlowData = {
    section1: { title: '', description: '' },
    section2: { mediaTitle: '', mediaFile: null },
    section3: { actionText: '', actionUrl: '' },
};

export const useFlowStore = create<FlowState>((set) => ({
    data: initial,
    updateSection: (section, value) =>
        set((state) => ({
            data: {
                ...state.data,
                [section]: {
                    ...state.data[section],
                    ...value,
                },
            },
        })),
    reset: () => set(() => ({ data: initial })),
}));
