import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DiaryEntry } from './entities/diary-entry.entity';
import { Emotion } from './entities/emotion.entity';
import { EntryEmotion } from './entities/entry-emotion.entity';
import { Distortion } from './entities/distortion.entity';

@Injectable()
export class JournalService implements OnModuleInit {
  constructor(
    @InjectRepository(DiaryEntry)
    private readonly journalRepository: Repository<DiaryEntry>,

    @InjectRepository(Emotion)
    private readonly emotionsRepository: Repository<Emotion>,

    @InjectRepository(EntryEmotion)
    private readonly entryEmotionsRepository: Repository<EntryEmotion>,

    @InjectRepository(Distortion)
    private readonly distortionRepository: Repository<Distortion>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedEmotions();
    await this.seedDistortions();
  }

  private async seedEmotions() {
    const count = await this.emotionsRepository.count();
    if (count === 0) {
      const burnisEmotions = [
        { name: 'Грусть', subtext: 'уныние, депрессия, хандра' },
        { name: 'Тревога', subtext: 'беспокойство, страх, паника, нервозность' },
        { name: 'Вина', subtext: 'стыд, угрызения совести, раскаяние' },
        { name: 'Злость', subtext: 'гнев, обида, раздражение, возмущение' },
        { name: 'Одиночество', subtext: 'изоляция, чувство заброшенности' },
        { name: 'Безнадежность', subtext: 'отчаяние, пессимизм' },
        { name: 'Смущение', subtext: 'неловкость, робость, замешательство' },
        { name: 'Неполноценность', subtext: 'неуверенность в себе, чувство никчемности' },
        { name: 'Разочарование', subtext: 'досада, неоправданные ожидания' },
      ];
      await this.emotionsRepository.save(this.emotionsRepository.create(burnisEmotions));
      console.log('✅ Библиотека эмоций успешно инициализирована');
    }
  }

  private async seedDistortions() {
    const count = await this.distortionRepository.count();
    if (count === 0) {
      const burnisDistortions = [
        { name: 'Сверхобобщение', definition: 'Формулирование глобальных выводов на основе единичных случаев (маркеры: «всегда», «никогда»).' },
        { name: 'Все или ничего', definition: 'Дихотомическое мышление, признающее только крайности.' },
        { name: 'Негативный фильтр', definition: 'Концентрация исключительно на отрицательных деталях.' },
        { name: 'Обесценивание положительного', definition: 'Игнорирование или обесценивание личных успехов и позитивного опыта.' },
        { name: 'Поспешные выводы', definition: 'Включают «чтение мыслей» окружающих и «ошибку предсказания».' },
        { name: 'Катастрофизация', definition: 'Преувеличение значимости проблем или преуменьшение важных фактов.' },
        { name: 'Эмоциональное обоснование', definition: 'Принятие чувств за неоспоримые факты («я так чувствую, значит, это правда»).' },
        { name: 'Императивы', definition: 'Использование слов-долженствований («должен», «обязан»).' },
        { name: 'Ярлыки', definition: 'Наделение себя или других жесткими негативными характеристиками.' },
        { name: 'Вина', definition: 'Необоснованный поиск виноватых вместо анализа причин.' },
      ];
      await this.distortionRepository.save(this.distortionRepository.create(burnisDistortions));
      console.log('✅ Справочник когнитивных искажений инициализирован');
    }
  }

  async create(data: any, userId: string): Promise<DiaryEntry> {
    const { emotions, distortionIds, ...entryData } = data;

    let distortions: Distortion[] = [];
    if (distortionIds && Array.isArray(distortionIds)) {
      distortions = await this.distortionRepository.findBy({
        id: In(distortionIds),
      });
    }

    const entry = this.journalRepository.create({
      ...entryData,
      user: { id: userId } as any,
      distortions,
    });

    const savedEntry = (await this.journalRepository.save(entry)) as unknown as DiaryEntry;

    if (emotions && Array.isArray(emotions)) {
      const emotionEntities = emotions.map((emo) =>
        this.entryEmotionsRepository.create({
          intensityBefore: emo.intensity,
          intensityAfter: emo.intensityAfter,
          entry: savedEntry,
          emotion: { id: emo.emotionId } as any,
        })
      );
      await this.entryEmotionsRepository.save(emotionEntities);
    }

    return this.findOne(savedEntry.id, userId);
  }

  async findAll(userId: string): Promise<DiaryEntry[]> {
    return this.journalRepository.find({
      where: { user: { id: userId } },
      relations: ['emotions', 'emotions.emotion', 'distortions'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<DiaryEntry> {
    const entry = await this.journalRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['emotions', 'emotions.emotion', 'distortions'],
    });
    if (!entry) throw new NotFoundException('Запись не найдена');
    return entry;
  }

  async remove(id: string, userId: string): Promise<void> {
    const entry = await this.findOne(id, userId);
    await this.journalRepository.remove(entry);
  }

  async update(id: string, userId: string, updateData: any): Promise<DiaryEntry> {
    const { distortionIds, ...rest } = updateData;
    const entry = await this.findOne(id, userId);

    if (distortionIds) {
      entry.distortions = await this.distortionRepository.findBy({ id: In(distortionIds) });
    }

    Object.assign(entry, rest);
    return this.journalRepository.save(entry);
  }

  async getDistortions(): Promise<Distortion[]> {
    return this.distortionRepository.find({
      order: { id: 'ASC' },
    });
  }
}
