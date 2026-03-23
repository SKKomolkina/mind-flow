import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Emotion } from './entities/emotion.entity';

@Controller('emotions')
export class EmotionsController {
  constructor(
    @InjectRepository(Emotion)
    private readonly emotionsRepo: Repository<Emotion>,
  ) {}

  @Get()
  async findAll(): Promise<Emotion[]> {
    return await this.emotionsRepo.find();
  }
}
