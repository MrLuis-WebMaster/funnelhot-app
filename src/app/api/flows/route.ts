import { NextRequest, NextResponse } from 'next/server';
import { readFlows, writeFlows } from '@/lib/db';
import { v4 as uuid } from 'uuid';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const flows = await readFlows();

    const newFlow = {
        id: uuid(),
        ...body,
        createdAt: new Date().toISOString(),
    };

    flows.push(newFlow);
    await writeFlows(flows);

    return NextResponse.json(newFlow, { status: 201 });
}

export async function GET() {
    const flows = await readFlows();
    return NextResponse.json(flows);
}