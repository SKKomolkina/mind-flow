import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { journalApi } from '@/entities/journal/api/journalApi';

const COLORS = ['#3b82f6', '#9a24fb', '#10b981', '#f87171', '#8b5cf6', '#f472b6'];

export const JournalAnalytics = () => {
  const [stats, setStats] = useState<{ dynamics: any[], distortions: any[] } | null>(null);

  useEffect(() => {
    journalApi.getStats().then(setStats).catch(console.error);
  }, []);

  if (!stats) return <div className="p-10 text-center font-black uppercase text-slate-400">Загрузка аналитики...</div>;

  return (
    <div className="space-y-8">
      {/* График динамики */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
        <h3 className="text-xl font-black mb-8 uppercase tracking-tight">Эффективность реструктуризации</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.dynamics}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
              <Tooltip
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Line
                name="Вера ДО"
                type="monotone"
                dataKey="before"
                stroke="#94a3b8"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                name="Вера ПОСЛЕ"
                type="monotone"
                dataKey="after"
                stroke="#3b82f6"
                strokeWidth={4}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Диаграмма искажений */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
        <h3 className="text-xl font-black mb-8 uppercase tracking-tight">Карта искажений</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.distortions}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {stats.distortions.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
