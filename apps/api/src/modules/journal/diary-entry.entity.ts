import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';

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

    // Шаг 3: Когнитивные искажения (массив строк)
    @Column({ type: 'simple-array', nullable: true })
    distortions: string[];

    // Шаг 4: Рациональный ответ
    @Column({ type: 'text', nullable: true })
    rationalResponse: string;

    // Шаг 5: Степень веры в мысль после (0-100%)
    @Column({ type: 'int', nullable: true })
    beliefAfter: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.entries, {
        onDelete: 'CASCADE',
        nullable: false
    })
    user: User;
}
