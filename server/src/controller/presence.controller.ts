import { Controller, Get } from '@nestjs/common';
import { PresenceService } from '../service/presence.service';

@Controller('presence')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @Get()
  async getInitialPresence() {
    return this.presenceService.getAllUsersPresence();
  }
}
