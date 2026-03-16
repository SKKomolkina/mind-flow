import { useState } from 'react';
import { authApi } from '@/features/auth/api/authApi';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authApi.login(email, password);
            alert('Связь установлена! Токен в localStorage.');
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Ошибка входа';
            alert(Array.isArray(errorMsg) ? errorMsg.join('\n') : errorMsg);
        }
    };

    return (
        <div style={{ maxWidth: '320px', margin: '100px auto', fontFamily: 'sans-serif' }}>
            <h1>Mind Flow</h1>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                    type="email"
                    placeholder="Электронная почта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" style={{ cursor: 'pointer', padding: '8px' }}>Войти</button>
            </form>
        </div>
    );
};
