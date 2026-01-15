import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const stylesPath = path.join(process.cwd(), 'app/styles.json');

        fs.writeFileSync(stylesPath, JSON.stringify(body, null, 4));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to save styles:', error);
        return NextResponse.json({ success: false, error: 'Failed to save styles' }, { status: 500 });
    }
}
