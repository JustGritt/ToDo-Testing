import { AgeException, EmailException, PasswordException } from "../src/exceptions/UserException";
import User from "../src/models/user";

describe("User validating...", () => {
    const user = new User('alex@tes.fr', 'Alex122311233221', 'h', 'test', new Date('1990-01-01'),);

    it("should invalidate email", () => {
        const setEmail = () => { user.setEmail('dssdsd') }
        expect(setEmail).toThrow(EmailException);
        expect(user.isValidUser()).toBe(true);
    })
    it("should invalidate password", () => {
        const setPassword = () => { user.setPassword('alex@gmail.fr') }
        expect(setPassword).toThrow(PasswordException);
        expect(user.isValidUser()).toBe(true);
    })

    it("should validate birthDate", () => {
        const setBirthDate = () => { user.setBirthDate(new Date('2012-01-01')) }
        expect(setBirthDate).toThrow(AgeException);
        expect(user.isValidUser()).toBe(true);
    })
})