import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne, OneToMany, ManyToMany, JoinTable,
} from 'typeorm';
import { User } from '../../auth/user.entity';
import { EntryEmotion } from './entry-emotion.entity';
import { Distortion } from './distortion.entity';

@Entity('diary_entries')
export class DiaryEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Шаг 1: Описание ситуации
  @Column({ type: 'text' })
  situation: string;

  // Шаг 2: Автоматическая мысль
  @Column({ type: 'text' })
  automaticThought: string;

  // Степень веры в мысль до (0-100%)
  @Column({ type: 'int' })
  beliefBefore: number;

  // Шаг 4: Рациональный ответ
  @Column({ type: 'text', nullable: true })
  rationalResponse: string;

  // Шаг 5: Степень веры в мысль после (0-100%)
  @Column({ type: 'int', nullable: true })
  beliefAfter: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user: User) => user.entries, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;

  @Column({ type: 'varchar', length: 50, nullable: true })
  emotion: string;

  @Column({ type: 'int', nullable: true })
  intensity: number;

  @OneToMany(() => EntryEmotion, (entryEmotion) => entryEmotion.entry)
  emotions: EntryEmotion[];

  // Шаг 3: Когнитивные искажения (массив строк)
  @ManyToMany(() => Distortion, (dist) => dist.entries)
  @JoinTable({ name: 'entry_distortions' })
  distortions: Distortion[];
}
