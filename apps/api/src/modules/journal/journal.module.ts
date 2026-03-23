import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { DiaryEntry } from './entities/diary-entry.entity';
import { Emotion } from './entities/emotion.entity';
import { EntryEmotion } from './entities/entry-emotion.entity';
import { EmotionsController } from './emotions.controller';
import { Distortion } from './entities/distortion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryEntry, Emotion, EntryEmotion, Distortion]),
  ],
  controllers: [JournalController, EmotionsController],
  providers: [JournalService],
})
export class JournalModule {}
