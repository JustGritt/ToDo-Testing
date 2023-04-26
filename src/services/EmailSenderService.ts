export class EmailSenderService {
    async sendEmail(email: string, message: string) {
        console.log(`Sending email to ${email} with message: ${message}`);
    }
}