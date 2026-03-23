import { useEffect, useState } from 'react';
import { journalApi } from '@/entities/journal/api/journalApi';
import type { EmotionDefinition, CreateEntryPayload } from '@/entities/journal/api/journalApi';

interface DistortionDefinition {
  id: number;
  name: string;
  definition: string;
}

interface Props {
  onSuccess: () => void;
}

export const AddEntryForm = ({ onSuccess }: Props) => {
  const [step, setStep] = useState(1);
  const [emotionsLibrary, setEmotionsLibrary] = useState<EmotionDefinition[]>([]);

  const [distortionsLibrary, setDistortionsLibrary] = useState<DistortionDefinition[]>([]);

  const [formData, setFormData] = useState({
    situation: '',
    automaticThought: '',
    beliefBefore: 50,
    distortions: [] as number[],
    rationalResponse: '',
    beliefAfter: 20,
  });

  const [emotionsValues, setEmotionsValues] = useState<Record<string, { before: number, after: number }>>({});

  useEffect(() => {
    journalApi.getEmotions().then(setEmotionsLibrary).catch(console.error);

    journalApi.getDistortions().then(setDistortionsLibrary).catch(console.error);
  }, []);

  const activeEmotionIds = Object.keys(emotionsValues).filter(id => emotionsValues[id].before > 0);

  const updateEmotion = (id: string, field: 'before' | 'after', value: number) => {
    setEmotionsValues(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
        ...(field === 'before' && (!prev[id]?.after) ? { after: value } : {}),
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload: any = {
        situation: formData.situation || 'Без названия',
        automaticThought: formData.automaticThought,
        beliefBefore: Number(formData.beliefBefore),
        distortionIds: formData.distortions,
        rationalResponse: formData.rationalResponse,
        beliefAfter: Number(formData.beliefAfter),
        emotions: activeEmotionIds.map(id => ({
          emotionId: id,
          intensity: emotionsValues[id].before,
          intensityAfter: emotionsValues[id].after,
        })),
      };

      await journalApi.create(payload);
      onSuccess();
      setStep(1);
      setEmotionsValues({});
      setFormData({
        situation: '',
        automaticThought: '',
        beliefBefore: 50,
        distortions: [],
        rationalResponse: '',
        beliefAfter: 20,
      });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Ошибка сохранения');
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl mb-12 overflow-hidden">
      <div className="h-1 bg-slate-100">
        <div className="bg-blue-600 h-full transition-all" style={{ width: `${(step / 6) * 100}%` }} />
      </div>
      <div className="p-10">
        {/* Шаг 1: Ситуация */}
        {step === 1 && (
          <div>
            <h3 className="text-2xl font-black mb-6">Что случилось?</h3>
            <textarea className="w-full p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 min-h-[150px]"
                      value={formData.situation}
                      onChange={e => setFormData({ ...formData, situation: e.target.value })} />
          </div>
        )}

        {/* Шаг 2: Эмоции */}
        {step === 2 && (
          <div>
            <h3 className="text-2xl font-black mb-6">Эмоции «ДО»</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emotionsLibrary.map(emo => (
                <div key={emo.id}
                     className="p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:border-blue-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-black text-[10px] uppercase">{emo.name}</p>
                      <p className="text-[9px] text-slate-400 leading-tight lowercase">{emo.subtext}</p>
                    </div>
                    <span className="text-blue-600 font-black text-[10px]">{emotionsValues[emo.id]?.before || 0}%</span>
                  </div>
                  <input type="range" className="w-full accent-blue-600"
                         value={emotionsValues[emo.id]?.before || 0}
                         onChange={e => updateEmotion(emo.id, 'before', Number(e.target.value))}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Шаг 3: Мысль */}
        {step === 3 && (
          <div>
            <h3 className="text-2xl font-black mb-6">Автоматическая мысль</h3>
            <input className="w-full p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 mb-6 font-bold italic"
                   value={formData.automaticThought}
                   onChange={e => setFormData({ ...formData, automaticThought: e.target.value })} />
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-black uppercase mb-2">Вера: {formData.beliefBefore}%</p>
              <input type="range" className="w-full accent-blue-600" value={formData.beliefBefore}
                     onChange={e => setFormData({ ...formData, beliefBefore: Number(e.target.value) })} />
            </div>
          </div>
        )}

        {/* Шаг 4: Искажения (ОБНОВЛЕННЫЙ) */}
        {step === 4 && (
          <div>
            <h3 className="text-2xl font-black mb-6">Когнитивные искажения</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {distortionsLibrary.map(d => (
                <button
                  key={d.id}
                  onClick={() => setFormData(p => ({
                    ...p,
                    // 5. Используем ID вместо имени для сравнения и сохранения
                    distortions: p.distortions.includes(d.id)
                      ? p.distortions.filter(x => x !== d.id)
                      : [...p.distortions, d.id],
                  }))}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.distortions.includes(d.id)
                      ? 'border-amber-400 bg-amber-50 shadow-inner'
                      : 'bg-white border-slate-100'
                  }`}
                >
                  <p className={`font-black uppercase text-[10px] ${formData.distortions.includes(d.id) ? 'text-amber-600' : 'text-slate-700'}`}>
                    {d.name}
                  </p>
                  <p className="text-[9px] text-slate-400 leading-tight mt-1">{d.definition}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Шаг 5: Ответ */}
        {step === 5 && (
          <div>
            <h3 className="text-2xl font-black mb-6">Рациональный ответ</h3>
            <textarea className="w-full p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 min-h-[150px] mb-6 italic"
                      value={formData.rationalResponse}
                      onChange={e => setFormData({ ...formData, rationalResponse: e.target.value })} />
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
              <p className="text-[10px] font-black uppercase mb-2 text-green-700">Вера в мысль СЕЙЧАС: {formData.beliefAfter}%</p>
              <input type="range" className="w-full accent-green-600" value={formData.beliefAfter}
                     onChange={e => setFormData({ ...formData, beliefAfter: Number(e.target.value) })} />
            </div>
          </div>
        )}

        {/* Шаг 6: Переоценка */}
        {step === 6 && (
          <div>
            <h3 className="text-2xl font-black mb-6">Переоценка чувств</h3>
            <div className="space-y-4">
              {activeEmotionIds.map(id => (
                <div key={id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex justify-between font-black uppercase text-[10px] mb-4">
                    <span>{emotionsLibrary.find(e => e.id === id)?.name}</span>
                    <div className="flex gap-4">
                      <span className="text-slate-300 line-through">{emotionsValues[id].before}%</span>
                      <span className="text-blue-600">{emotionsValues[id].after}%</span>
                    </div>
                  </div>
                  <input type="range" className="w-full accent-blue-600"
                         value={emotionsValues[id].after}
                         onChange={e => updateEmotion(id, 'after', Number(e.target.value))} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
          <button onClick={() => setStep(s => s - 1)} disabled={step === 1}
                  className={`font-black uppercase text-[10px] ${step === 1 ? 'opacity-0' : 'text-slate-400'}`}>← Назад
          </button>
          {step < 6 ? (
            <button onClick={() => setStep(s => s + 1)}
                    className="px-10 py-3 bg-blue-600 text-white font-black uppercase text-[10px] rounded-xl shadow-lg shadow-blue-200">Далее →</button>
          ) : (
            <button onClick={handleSubmit}
                    className="px-10 py-3 bg-green-600 text-white font-black uppercase text-[10px] rounded-xl shadow-lg shadow-green-200">Сохранить</button>
          )}
        </div>
      </div>
    </div>
  );
};
