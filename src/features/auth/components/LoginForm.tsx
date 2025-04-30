'use client';

import { Button, Container, TextField, Typography } from '@mui/material';
import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';

export default function LoginForm() {
    const { login, loading } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Todos los campos son obligatorios');
            return;
        }

        setError('');
        await login(email, password);
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 10 }}>
            <Typography variant="h5" gutterBottom>
                Iniciar sesión
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Correo"
                    margin="normal"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Contraseña"
                    margin="normal"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    {loading ? 'Ingresando...' : 'Entrar'}
                </Button>
            </form>
        </Container>
    );
}
