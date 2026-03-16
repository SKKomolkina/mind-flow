import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryEntry } from './diary-entry.entity';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryEntry])],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}
