export const mockEmailSenderService = (email: string) => {
    console.log(`Mocked email sender service ${email}`);
};

const mock = jest.fn().mockImplementation(() => {
    return { sendEmail: mockEmailSenderService };
});

export default mock;