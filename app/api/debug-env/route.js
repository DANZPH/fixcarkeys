import { NextResponse } from 'next/server';

// Check environment variables for auth (debugging only - remove in production!)
export async function GET() {
    return NextResponse.json({
        adminUsername: process.env.ADMIN_USERNAME || 'admin (default)',
        adminPasswordSet: process.env.ADMIN_PASSWORD ? 'Yes (hidden)' : 'Using default: admin123',
        jwtSecretSet: process.env.JWT_SECRET ? 'Yes' : 'Using default',
        tursoUrl: process.env.TURSO_DATABASE_URL ? 'Set' : 'Not set',
        tursoToken: process.env.TURSO_AUTH_TOKEN ? 'Set (hidden)' : 'Not set',
    });
}
