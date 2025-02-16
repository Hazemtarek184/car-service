export interface EmailRequest {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export interface EmailResponse {
  status: 'success' | 'failed';
  error: string | null;
}

export interface MailModuleOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}
