import { AgeException, EmailException, PasswordException } from "../src/exceptions/UserException";
import User from "../src/models/user";

export const user = new User('alex@tes.fr', 'Alex122311233221', 'h', 'test', new Date('1990-01-01'),);

describe("User validating...", () => {

    it("should invalidate email", () => {
        const setEmail = () => { user.setEmail('dssdsd') }
        expect(setEmail).toThrow(EmailException);
    })
    it("should invalidate password", () => {
        const setPassword = () => { user.setPassword('alex@gmail.fr') }
        expect(setPassword).toThrow(PasswordException);
    })

    it("should validate birthDate", () => {
        const setBirthDate = () => { user.setBirthDate(new Date('2000-01-01')) }
        setBirthDate();
        expect(user).toHaveProperty('birthDate', new Date('2000-01-01'));
    })
})

// @ts-ignore
global.user = user;
