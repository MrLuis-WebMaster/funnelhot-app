/* eslint-disable @next/next/no-img-element */
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Box, Typography, Button } from '@mui/material';
import { FlowNodeData } from '../flow.types';

export default function CustomNode({ data }: NodeProps) {
    const { title, description, mediaUrl, actionUrl } = (data || {}) as FlowNodeData;

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: 2,
                border: '1px solid',
                borderColor: 'divider',
                width: 240,
                textAlign: 'center',
            }}
        >
            <Typography fontWeight="bold">
                {title || 'Sin título'}
            </Typography>

            {description && (
                <Typography variant="body2" mt={1}>
                    {description}
                </Typography>
            )}

            {mediaUrl && (
                <>
                    <Box mt={1}>
                        <img
                            src={typeof mediaUrl === 'string' ? mediaUrl : ''}
                            alt="media"
                            width={240}
                            height={100}
                            style={{ objectFit: 'contain', borderRadius: 4 }}
                        />
                    </Box>
                    <Typography variant="caption" mt={1} sx={{ wordBreak: 'break-word' }}>
                        {mediaUrl}
                    </Typography>
                </>
            )}

            {actionUrl && (
                <>
                    <Box mt={1}>
                        <Button
                            variant="outlined"
                            size="small"
                            href={actionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            fullWidth
                        >
                            Abrir enlace
                        </Button>
                    </Box>
                    <Typography variant="caption" mt={1} sx={{ wordBreak: 'break-word' }}>
                        {actionUrl}
                    </Typography>
                </>
            )}

            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </Box>
    );
}
