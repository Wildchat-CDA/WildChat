import { Module } from '@nestjs/common';
import { HackmdController } from '../controller/hackmd.controller';
import { HackmdService } from '../service/hackmd.service';

@Module({
  controllers: [HackmdController],
  providers: [HackmdService],
})
export class HackmdModule {}
