import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalModule } from './modules/journal/journal.module';
import { User } from './modules/auth/user.entity';
import {DiaryEntry} from "./modules/journal/diary-entry.entity";
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'user',
      password: 'password',
      database: 'mindflow',
      autoLoadEntities: true,
      entities: [User, DiaryEntry],
      synchronize: true,
    }),
    JournalModule,
    AuthModule,
  ],
})
export class AppModule {}
