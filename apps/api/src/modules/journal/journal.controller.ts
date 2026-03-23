import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JournalService } from './journal.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { Distortion } from './entities/distortion.entity';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get('distortions')
  async getDistortions(): Promise<Distortion[]> {
    return this.journalService.getDistortions();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() data: CreateEntryDto, @Req() req: Request) {
    const user = req.user as any;
    return this.journalService.create(data, user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as any;
    return this.journalService.findAll(user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.journalService.remove(id, user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateEntryDto>,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.journalService.update(id, user.userId, updateData);
  }
}
