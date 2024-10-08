import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmailService } from '../service/email.service';

@Controller('test')
export class TestEmailController {
  constructor(private emailService: EmailService) {}

  @Get('email')
  testGetEmail() {
    return { message: 'GET route is working' };
  }

  @Post('email')
  async testEmail(@Body('to') to: string) {
    try {
      await this.emailService.sendEmail(
        to,
        'Test Email via SendGrid',
        "Ceci est un test d'envoi d'email avec SendGrid et NestJS",
        "<h1>Test Email</h1><p>Ceci est un test d'envoi d'email avec SendGrid et NestJS</p>",
      );
      return { success: true, message: 'Email envoyé avec succès' };
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return {
        success: false,
        message: "Erreur lors de l'envoi de l'email",
        error: error.message,
      };
    }
  }
}
