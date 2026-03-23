import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '@/shared/api/base';

export const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { email, password });

      const token = response.data.access_token || response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/journal');
      } else {
        alert('Регистрация успешна! Теперь войдите в аккаунт.');
        navigate('/login');
      }
    } catch (err: any) {
      console.error('Ошибка регистрации:', err);
      alert(err.response?.data?.message || 'Ошибка при создании аккаунта');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col justify-center py-12 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Создать аккаунт</h2>
        <p className="mt-2 text-sm text-slate-500 font-medium">Начните записывать свои мысли прямо сейчас</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[400px]">
        <div className="bg-white py-10 px-8 shadow-xl shadow-slate-200/50 border border-slate-200 rounded-3xl">
          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Как вас зовут?</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Пароль</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="w-full py-4 bg-[#0f172a] hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]">
              Зарегистрироваться
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
