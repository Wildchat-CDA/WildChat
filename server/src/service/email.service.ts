import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    this.logger.debug(`SMTP_HOST: ${process.env.SMTP_HOST}`);
    this.logger.debug(`SMTP_PORT: ${process.env.SMTP_PORT}`);
    this.logger.debug(`SMTP_SECURE: ${process.env.SMTP_SECURE}`);
    this.logger.debug(`SMTP_USER: ${process.env.SMTP_USER}`);
    this.logger.debug(`SMTP_FROM: ${process.env.SMTP_FROM}`);

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
