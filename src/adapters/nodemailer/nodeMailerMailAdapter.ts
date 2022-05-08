import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "30939dec04c9c6",
    pass: "cde81c396c778a"
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {

    await transport.sendMail({
      from: 'Feedget team <oi@feedget.com>',
      to: 'Pedro Barros <pedrobars7a@gmail.com>',
      subject,
      html: body,
    });
  }
}