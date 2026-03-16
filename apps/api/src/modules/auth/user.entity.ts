import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DiaryEntry } from '../journal/diary-entry.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string; // пароли только в зашифрованном виде

    @OneToMany(() => DiaryEntry, (entry) => entry.user)
    entries: DiaryEntry[];
}
