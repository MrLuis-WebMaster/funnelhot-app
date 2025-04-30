import fs from 'fs/promises';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'flows.json');

async function ensureFile() {
    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.mkdir(DB_DIR, { recursive: true });
        await fs.writeFile(DB_PATH, '[]');
    }
}

export async function readFlows() {
    await ensureFile();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

export async function writeFlows(flows: unknown[]) {
    await ensureFile();
    await fs.writeFile(DB_PATH, JSON.stringify(flows, null, 2));
}
