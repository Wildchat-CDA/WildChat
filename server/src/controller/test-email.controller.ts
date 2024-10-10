import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { EmailService } from '../service/email.service';

@Controller('test')
export class TestEmailController {
  private readonly logger = new Logger(TestEmailController.name);

  constructor(private emailService: EmailService) {}

  @Get('email')
  testGetEmail() {
    return { message: 'GET route is working' };
  }

  @Post('email')
  async testEmail(@Body('to') to?: string) {
    if (!to) {
      this.logger.warn('No recipient email provided');
      return {
        success: false,
        message: 'Adresse email du destinataire manquante',
      };
    }

    try {
      await this.emailService.sendEmail(
        to,
        'Test Email via SendGrid',
        "Ceci est un test d'envoi d'email avec SendGrid et NestJS",
        "<h1>Test Email</h1><p>Ceci est un test d'envoi d'email avec SendGrid et NestJS</p>",
      );
      this.logger.log(`Email sent successfully to ${to}`);
      return { success: true, message: 'Email envoyé avec succès' };
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi de l'email: ${error.message}`,
        error.stack,
      );
      return {
        success: false,
        message: "Erreur lors de l'envoi de l'email",
        error: error.message,
      };
    }
  }
}
