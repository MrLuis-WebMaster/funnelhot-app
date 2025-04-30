'use client';

import { setCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await new Promise((res) => setTimeout(res, 1000));
            setCookie(null, 'auth_token', 'mock_token', {
                path: '/',
                maxAge: 60 * 60,
            });

            router.push('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    return { login, loading };
}
