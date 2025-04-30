import { NextRequest, NextResponse } from 'next/server';
import { routes } from './src/config/routes';

function isProtected(pathname: string): boolean {
    return routes.protected.some((route) => pathname.startsWith(route));
}

function isPublic(pathname: string): boolean {
    return routes.public.includes(pathname);
}

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token');
    const pathname = req.nextUrl.pathname;

    if (!token && isProtected(pathname)) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if (token && isPublic(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|api|favicon.ico).*)'],
};
