import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DiaryEntry } from './diary-entry.entity';
import { Emotion } from './emotion.entity';

@Entity('entry_emotions')
export class EntryEmotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  intensityBefore: number;

  @Column({ type: 'int', nullable: true })
  intensityAfter: number;

  @ManyToOne(() => DiaryEntry, (entry) => entry.emotions, {
    onDelete: 'CASCADE',
  })
  entry: DiaryEntry;

  @ManyToOne(() => Emotion, (emotion) => emotion.entryEmotions)
  emotion: Emotion;
}
