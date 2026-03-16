import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {DiaryEntry} from './diary-entry.entity';
import {CreateEntryDto} from "./dto/create-entry.dto";

@Injectable()
export class JournalService {
    constructor(
        @InjectRepository(DiaryEntry)
        private journalRepository: Repository<DiaryEntry>,
    ) {
    }

    async create(data: Partial<DiaryEntry>, userId: string): Promise<DiaryEntry> {
        const entry = this.journalRepository.create({
            ...data,
            user: {id: userId} as any,
        });
        return this.journalRepository.save(entry);
    }

    async findAll(userId: string): Promise<DiaryEntry[]> {
        return this.journalRepository.find({
            where: {
                user: {id: userId}
            },
            order: {createdAt: 'DESC'},
        });
    }

    async findOne(id: string, userId: string): Promise<DiaryEntry> {
        const entry = await this.journalRepository.findOne({
            where: { id, user: { id: userId } },
        });
        if (!entry) throw new NotFoundException('Запись не найдена');
        return entry;
    }

    async remove(id: string, userId: string): Promise<void> {
        const entry = await this.findOne(id, userId);
        await this.journalRepository.remove(entry);
    }

    async update(id: string, userId: string, updateData: Partial<CreateEntryDto>): Promise<DiaryEntry> {
        const entry = await this.findOne(id, userId);
        Object.assign(entry, updateData);
        return this.journalRepository.save(entry);
    }
}
