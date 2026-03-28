import { useState } from 'react';
import { JournalAnalytics } from '@/widgets/JournalAnalytics';
import { AddEntryForm } from '@/features/journal-add/index.ts';
import { Navbar } from '@/widgets/Navbar';

export const HomePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <section className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Обзор состояния</h1>
            <p className="text-slate-400 font-medium text-sm uppercase tracking-widest">Интеллектуальная аналитика СППР</p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-10 py-4 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
          >
            + Новая запись
          </button>
        </section>

        {/* Только графики */}
        <div className="grid grid-cols-1 gap-8">
          <JournalAnalytics />
        </div>
      </main>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-8 right-8 z-10 text-slate-300 hover:text-slate-900 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <AddEntryForm onSuccess={() => {
              setModalOpen(false);
              window.location.reload(); // Чтобы графики обновились
            }} />
          </div>
        </div>
      )}
    </div>
  );
};
