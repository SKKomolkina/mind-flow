import { api } from '@/shared/api/base';

export const authApi = {
    async login(email: string, pass: string) {
        const { data } = await api.post('/auth/login', {
            email,
            password: pass
        });

        if (data.access_token) {
            localStorage.setItem('token', data.access_token);
        }
        return data;
    },

    async register(email: string, pass: string) {
        return api.post('/auth/register', {
            email,
            password: pass
        });
    }
};
