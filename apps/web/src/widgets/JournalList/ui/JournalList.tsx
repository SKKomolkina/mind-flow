import { useEffect, useState } from 'react';
import { journalApi } from '@/entities/journal/api/journalApi';

export const JournalList = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    journalApi.findAll()
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center font-black text-slate-400 uppercase text-xs">Загрузка истории...</div>;

  if (entries.length === 0) return (
    <div className="p-20 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
      <p className="font-black text-slate-400 uppercase text-xs tracking-widest">Записей пока нет</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-6">
      {entries.map((entry) => (
        <div key={entry.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              {new Date(entry.createdAt).toLocaleDateString()}
            </span>
            <div className="flex gap-2">
              {entry.distortions?.map((d: any) => (
                <span key={d.id} className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                  {d.name}
                </span>
              ))}
            </div>
          </div>

          <h4 className="text-lg font-black mb-2 text-slate-800">{entry.situation}</h4>
          <p className="text-sm text-slate-500 italic mb-4">«{entry.automaticThought}»</p>

          <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
            <div>
              <p className="text-[8px] font-black text-slate-400 uppercase">Вера ДО</p>
              <p className="font-black text-red-500">{entry.beliefBefore}%</p>
            </div>
            <div className="text-slate-300">→</div>
            <div>
              <p className="text-[8px] font-black text-slate-400 uppercase">Вера ПОСЛЕ</p>
              <p className="font-black text-green-500">{entry.beliefAfter}%</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
