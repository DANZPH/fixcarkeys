import { NextResponse } from 'next/server';
import { generateToken, validateCredentials } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        if (!validateCredentials(username, password)) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const token = generateToken({ username, role: 'admin' });

        // Set HTTP-only cookie
        const cookieStore = await cookies();
        cookieStore.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return NextResponse.json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
