export default class UserUtils {
    // check if email is valid with regex
    static checkEmail(email: string): boolean {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    // check if password is valid with regex the password should contain (between 8-40 characters and at least 1 uppercase, 1 lowercase, 1 number)
    static checkPassword(password: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,40}$/;
        return regex.test(password);
    }

    // check if user is above 13 years old
    static checkAge(birthDate: Date): boolean {
        const now = new Date();
        const diff = now.getTime() - birthDate.getTime();
        const age = Math.floor(diff / 31557600000);
        return age > 13;
    }
}