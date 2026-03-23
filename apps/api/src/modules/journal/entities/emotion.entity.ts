import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EntryEmotion } from './entry-emotion.entity';

@Entity('emotions')
export class Emotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  subtext: string;

  @OneToMany(
    () => EntryEmotion,
    (ee: EntryEmotion): EntryEmotion['emotion'] => ee.emotion,
  )
  entryEmotions: EntryEmotion[];
}
