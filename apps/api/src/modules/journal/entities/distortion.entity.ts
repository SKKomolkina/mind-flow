import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { DiaryEntry } from './diary-entry.entity';

@Entity('distortions')
export class Distortion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text' })
  definition: string;

  @ManyToMany(() => DiaryEntry, (entry) => entry.distortions)
  entries: DiaryEntry[];
}
