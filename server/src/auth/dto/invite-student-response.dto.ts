import { HttpStatus } from '@nestjs/common';

export class InviteStudentResponseDto {
  status: HttpStatus;
  message: string;
  token?: string;
}