import { Controller, Get, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { UserService } from 'src/service/user.service';

import { User } from 'src/entity/user.entity';
import { Channel } from 'src/entity/channel.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async get(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Votre contrôleur
  @Get(':id/private-channels')
  async getUserChannels(@Param('id') id: number): Promise<Channel[]> {
    try {
      const channels = await this.userService.getUserChannels(id);
      return channels;
    } catch (error) {
      if (error.message === 'User not found') {
        throw new NotFoundException('User not found');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
