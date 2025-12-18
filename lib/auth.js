import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export function validateCredentials(username, password) {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function getAuthCookie() {
    try {
        const cookieStore = await cookies();
        return cookieStore.get('admin_token')?.value;
    } catch (error) {
        return null;
    }
}

export async function isAuthenticated() {
    const token = await getAuthCookie();
    if (!token) return false;

    const decoded = verifyToken(token);
    return !!decoded;
}

export async function requireAuth() {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        throw new Error('Unauthorized');
    }
    return true;
}
