import { destroyCookie } from 'nookies';

export function logout() {
    destroyCookie(null, 'auth_token');
    window.location.href = '/auth/login';
}
