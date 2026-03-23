import { useEffect, useState } from 'react';
import { journalApi } from '@/entities/journal/api/journalApi';
import type { JournalEntry } from '@/entities/journal/api/journalApi';
import { AddEntryForm } from '@/features/journal-add/ui/AddEntryForm';

export const JournalPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await journalApi.findAll();
      setEntries(Array.isArray(data) ? [...data].reverse() : []);
    } catch (err) { console.error('Ошибка загрузки:', err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  if (loading) return <div className="p-20 text-center font-black text-slate-300 uppercase tracking-widest">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <AddEntryForm onSuccess={loadData} />

        <div className="space-y-10 mt-16">
          {entries.map((entry: any) => (
            <div key={entry.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-hover hover:shadow-md">
              <div className="mb-6">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter mb-1 block">Ситуация</span>
                <p className="text-xl font-bold text-slate-900 leading-tight">{entry.situation}</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-[2rem] mb-6">
                <div className="space-y-5">
                  {entry.emotions?.map((emo: any) => {
                    // Проверяем ВСЕ возможные ключи, которые может прислать бэк
                    const before = Number(emo.intensity ?? emo.intensityBefore ?? 0);
                    const after = Number(emo.intensityAfter ?? before);

                    return (
                      <div key={emo.id}>
                        <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                          <span className="text-slate-500">{emo.emotion?.name || 'Чувство'}</span>
                          <span className="flex gap-2">
                            <span className="text-slate-300">{before}%</span>
                            <span className="text-blue-600">{after}%</span>
                          </span>
                        </div>
                        {/* ДВОЙНОЙ БАР: Показывает прогресс уменьшения */}
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden relative">
                          {/* Светлая полоска (БЫЛО) */}
                          <div className="absolute h-full bg-blue-200 opacity-50" style={{ width: `${before}%` }} />
                          {/* Яркая полоска (СТАЛО) */}
                          <div className="absolute h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" style={{ width: `${after}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-50 pt-6">
                <p className="text-sm font-medium italic text-slate-600">«{entry.automaticThought}»</p>
                {entry.rationalResponse && (
                  <div className="p-5 bg-blue-600 rounded-2xl text-white text-sm font-bold shadow-lg shadow-blue-500/20">
                    {entry.rationalResponse}
                  </div>
                )}
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                  <span>Вера: {entry.beliefBefore}% → <span className="text-blue-600">{entry.beliefAfter}%</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
