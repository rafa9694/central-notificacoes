export interface ConfigEmail {
  serverName: string;
  submissionPortal: string;
  login: string;
  password: string;
  senderName: string;
  senderEmail: string;
  template: File | null;
}