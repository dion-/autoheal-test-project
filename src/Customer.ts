
export class Customer {
  name?: string;
  smsOptin: boolean = false;
  emailOptin: boolean = false;

  setName(name: string) {
    this.name = name;
  }

  setSmsOptin(optin: boolean) {
    this.smsOptin = optin;
  }

  setEmailOptin(optin: boolean) {
    this.emailOptin = optin;
  }

  setMarketingOptin(smsOptin: boolean, emailOptin: boolean) {
    this.smsOptin = smsOptin;
    this.emailOptin = emailOptin;
  }
}
