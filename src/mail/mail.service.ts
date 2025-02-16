import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { EmailRequest, EmailResponse } from './index';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = this.createTransporter();
    this.verifyTransporter(this.transporter);
  }

  private createTransporter(): Transporter {
    return createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: parseInt(this.configService.get('MAIL_PORT')),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  private verifyTransporter(transporter: Transporter): void {
    transporter.verify((error) => {
      if (error) {
        console.error('Error verifying transporter:', error);
      } else {
        console.log('Transporter is ready to send emails');
      }
    });
  }

  public async sendEmail(emailObject: EmailRequest): Promise<EmailResponse> {
    const response: EmailResponse = { status: 'success', error: null };
    try {
      emailObject.from = this.configService.get('MAIL_FROM');
      await this.transporter.sendMail(emailObject);
    } catch (error) {
      console.error('Failed to send email:', error);
      response.status = 'failed';
      response.error = error.toString();
    }
    return response;
  }

  public async sendResetCode(to: string, code: string): Promise<void> {
    const emailObject: EmailRequest = {
      to,
      subject: 'Password Reset Code',
      html: `<p>Your password reset code is: <strong>${code}</strong>. It expires in 1 hour.</p>`,
    };

    const response = await this.sendEmail(emailObject);

    if (response.status === 'failed') {
      throw new Error('Failed to send reset code email. Please try again.');
    }
  }
}
