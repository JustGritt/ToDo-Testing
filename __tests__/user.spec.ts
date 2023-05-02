import { EmailException, PasswordException, AgeException } from "../src/exceptions/UserException";
import User from "../src/models/user";

export const user = new User('alex@tes.fr', 'Alex122311233221', 'h', 'test', new Date('1990-01-01'));
export const invalidUser = new User('John', 'Doe', 'Invalid', 'User', new Date('2020-01-01'));

describe("User validation", () => {

    describe("User email validation", () => {
        it("Should be a correct email (alex@tes.fr)", () => {
            const setEmail = () => { user.setEmail('johndoe@mail.fr') }
            expect(setEmail).not.toThrow(EmailException);
        })

        it("Should be an invalid email (a)", () => {
            const setEmail = () => { user.setEmail('a') }
            expect(setEmail).toThrow(EmailException);
        })
    })

    describe("User password validation", () => {
        it("Should be a valid password (Alex122311233221)", () => {
            const setPassword = () => { user.setPassword('Alex122311233221') }
            expect(setPassword).not.toThrow(PasswordException);
        })

        it("Should be an invalid password (b)", () => {
            const setPassword = () => { user.setPassword('b') }
            expect(setPassword).toThrow(PasswordException);
        })
    })

    describe("User age validation", () => {
        it("Should be a valid age (33 years old)", () => {
            const setBirthDate = () => { user.setBirthDate(new Date('1990-01-01')) }
            expect(setBirthDate).not.toThrow(AgeException);
        })

        it("Should be an invalid age (3 years old)", () => {
            const setBirthDate = () => { user.setBirthDate(new Date('2020-01-01')) }
            expect(setBirthDate).toThrow(AgeException);
        })
    })
})

// @ts-ignore
global.user = user;
// @ts-ignore
global.invalidUser = invalidUser;