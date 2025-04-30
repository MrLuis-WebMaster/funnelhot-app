export type FlowNodeData = {
    title: string;
    description?: string;
    mediaUrl?: string;
    actionUrl?: string;
};

export type FlowData = {
    section1: {
        title: string;
        description: string;
    };
    section2: {
        mediaTitle: string;
        mediaFile: File | null;
        mediaUrl?: string;
    };
    section3: {
        actionText: string;
        actionUrl: string;
    };
};

export interface FlowState {
    data: FlowData;
    updateSection: <K extends keyof FlowData>(section: K, value: Partial<FlowData[K]>) => void;
    reset: () => void;
}
