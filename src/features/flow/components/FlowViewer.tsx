'use client';

import {
    ReactFlow,
    Background,
    Controls,
    addEdge,
    useEdgesState,
    useNodesState,
    Connection,
    Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EditNodeDialog from './EditNodeDialog';
import { getFlowById, updateFlow } from '../services/flowService';
import { Button, Box } from '@mui/material';
import CustomNode from './CustomNode';
import { FlowData, FlowNodeData } from '../flow.types';

const initialLayout = {
    section1: { x: 100, y: 100 },
    section2: { x: 350, y: 100 },
    section3: { x: 600, y: 100 },
};

export default function FlowViewer() {
    const params = useParams();
    const [data, setData] = useState<FlowData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedNode, setSelectedNode] = useState<Node<FlowNodeData> | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node<FlowNodeData>>([]);    
    const [edges, setEdges, onEdgesChange] = useEdgesState([
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
    ]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getFlowById(params.id as string);
                setData(res);

                setNodes([
                    {
                        id: '1',
                        data: {
                            title: `${res.section1.title}`,
                            description: res.section1.description,
                        },
                        position: initialLayout.section1,
                        type: 'custom',
                    },
                    {
                        id: '2',
                        data: {
                            title: `${res.section2.mediaTitle}`,
                            mediaUrl: res.section2.mediaUrl,
                        },
                        position: initialLayout.section2,
                        type: 'custom',
                    },
                    {
                        id: '3',
                        data: {
                            title: `${res.section3.actionText}`,
                            actionUrl: res.section3.actionUrl,
                        },
                        position: initialLayout.section3,
                        type: 'custom',
                    },
                ]);

            } catch (e) {
                console.error('Error al cargar el flujo', e);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [params.id, setNodes]);

    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    const onNodeClick = useCallback((_event: unknown, node: Node<FlowNodeData>) => {
        setSelectedNode(node);
    }, []);

    const handleSave = (value: string) => {
        if (!selectedNode || !data) return;

        const updatedNodes = nodes.map((n) =>
            n.id === selectedNode.id ? { ...n, data: { ...n.data, title: value } } : n
        );
        setNodes(updatedNodes);

        const key = selectedNode.id === '1' ? 'section1'
            : selectedNode.id === '2' ? 'section2'
                : 'section3';

        const field = key === 'section2' ? 'mediaTitle' : key === 'section3' ? 'actionText' : 'title';

        const updatedData = {
            ...data,
            [key]: { ...data[key], [field]: value },
        };

        setData(updatedData);
        setSelectedNode(null);
    };


    const handleUpdateBackend = async () => {
        if (!data) return;
        await updateFlow(params.id as string, data);
        alert('Flujo actualizado con éxito ✅');
    };

    const nodeTypes = {
        custom: CustomNode,
    };

    if (loading) return <p>Cargando flujo...</p>;
    if (!data) return <p>Error al cargar los datos del flujo.</p>;

    return (
        <>
            <div style={{ height: '70vh', width: '100%' }}>
                <ReactFlow
                    colorMode="dark" 
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    fitView
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>

            {selectedNode && (
                <EditNodeDialog
                    open={!!selectedNode}
                    value={selectedNode?.data.title ?? ''}
                    onClose={() => setSelectedNode(null)}
                    onSave={handleSave}
                />
            )}

            <Box mt={2}>
                <Button variant="contained" onClick={handleUpdateBackend}>
                    Guardar cambios
                </Button>
            </Box>
        </>
    );
}
