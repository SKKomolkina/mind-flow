import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { getDistortions } from '@/shared/api/base.ts';
import styles from './DistortionSelector.module.scss';

interface Distortion {
  id: number;
  name: string;
  definition: string;
}

interface Props {
  selectedDistortions: number[];
  onChange: (ids: number[]) => void;
}

export const DistortionSelector: React.FC<Props> = ({ selectedDistortions, onChange }) => {
  const [distortions, setDistortions] = useState<Distortion[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Загружаем данные из БД
    getDistortions().then(setDistortions);
  }, []);

  useEffect(() => {
    // Анимация GSAP: карточки «всплывают» по очереди
    if (distortions.length > 0) {
      gsap.fromTo(
        `.${styles.card}`,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [distortions]);

  const toggleId = (id: number) => {
    const nextIds = selectedDistortions.includes(id)
      ? selectedDistortions.filter((i) => i !== id)
      : [...selectedDistortions, id];
    onChange(nextIds);
  };

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <h3 className={styles.title}>Какие искажения вы заметили?</h3>
      <div className={styles.grid}>
        {distortions.map((dist) => (
          <div
            key={dist.id}
            className={`${styles.card} ${
              selectedDistortions.includes(dist.id) ? styles.active : ''
            }`}
            onClick={() => toggleId(dist.id)}
          >
            <div className={styles.checkbox} />
            <div className={styles.content}>
              <h4>{dist.name}</h4>
              <p>{dist.definition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
