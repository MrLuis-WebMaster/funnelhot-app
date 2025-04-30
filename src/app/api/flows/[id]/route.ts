import { readFlows, writeFlows } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params;
    const flows = await readFlows();
    const flow = flows.find((f: { id: string; }) => f.id === id);

    if (!flow) {
        return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    }

    return NextResponse.json(flow);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params;
    const body = await req.json();
    const flows = await readFlows();
    const index = flows.findIndex((f: { id: string; }) => f.id === id);

    if (index === -1) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });

    flows[index] = { ...flows[index], ...body, updatedAt: new Date().toISOString() };
    await writeFlows(flows);

    return NextResponse.json(flows[index]);
}
