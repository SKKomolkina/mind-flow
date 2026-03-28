import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '@/shared/api/base.ts';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });

      const token = response.data.access_token || response.data.token || response.data.accessToken;

      if (token) {
        localStorage.setItem('token', token);
        console.log('Токен успешно сохранен, выполняю редирект...');
        navigate('/journal');
      } else {
        console.error('Сервер не прислал токен. Ответ сервера:', response.data);
        alert('Ошибка авторизации: сервер не прислал ключ доступа');
      }
    } catch (err: any) {
      console.error('Ошибка при входе:', err);
      alert('Не удалось войти: ' + (err.response?.data?.message || 'ошибка сервера'));
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col justify-center py-12 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/20">
          <span className="text-white text-2xl font-black">M</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          С возвращением
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          Продолжайте ваш путь к осознанности в Mind-Flow
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[400px]">
        <div className="bg-white py-10 px-8 shadow-xl shadow-slate-200/50 border border-slate-200 rounded-3xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Электронная почта
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Пароль
                </label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors">
                  Забыли пароль?
                </a>
              </div>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-slate-900/20 text-sm font-bold text-white bg-[#0f172a] hover:bg-blue-600 focus:outline-none transition-all active:scale-[0.98]"
              >
                Войти в аккаунт
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Нет аккаунта?{' '}
            <Link to="/registration" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
