import { Controller, Get, Param } from '@nestjs/common';
import { HackmdService } from '../service/hackmd.service';

@Controller('api/hackmd')
export class HackmdController {
  constructor(private readonly hackmdService: HackmdService) {}

  @Get('notes/:noteId')
  async getNoteContent(@Param('noteId') noteId: string) {
    return this.hackmdService.getNoteContent(noteId);
  }
}
