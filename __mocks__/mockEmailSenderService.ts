import { EmailSenderService } from "../src/services/EmailSenderService";

export const mockEmailSenderService = (email: string) => {
    console.log(`Mocked email sender service ${email}`);
};

const mock = jest.fn().mockImplementation(() => {
    return { sendEmail: EmailSenderService.prototype.sendEmail };
});

export default mock;