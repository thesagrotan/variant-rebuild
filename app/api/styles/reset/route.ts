import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST() {
    try {
        const stylesPath = path.join(process.cwd(), 'app/styles.json');
        const defaultsPath = path.join(process.cwd(), 'app/styles.defaults.json');

        const defaults = fs.readFileSync(defaultsPath, 'utf-8');
        fs.writeFileSync(stylesPath, defaults);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to reset styles:', error);
        return NextResponse.json({ success: false, error: 'Failed to reset styles' }, { status: 500 });
    }
}
