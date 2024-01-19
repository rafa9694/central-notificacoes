import { ConfigEmail } from "./config-email.model";
import { ConfigSMS } from "./config-sms.model";
import { WebPush } from "./web-push.model";

export interface ConfigTable {
  name: string;
  type: string;
  configWebPush?: WebPush;
  configEmail?: ConfigEmail;
  configSMS?: ConfigSMS;
}