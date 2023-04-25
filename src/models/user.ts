import sha256 from 'crypto-js/sha256';
import { EmailException, AgeException, PasswordException } from '../exceptions/UserException';
import UserUtils from '../helpers/userUtils';

export default class User {
    private email: string;
    private firstName: string;
    private lastName: string;
    private birthDate: Date;
    private password: string;

    constructor(email: User['email'], password: User['password'], firstName: User['firstName'], lastName: User['lastName'], birthDate: User['birthDate']) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.setPassword(password)
        return this;
    }

    public setPassword(password: string): void {
        if (!UserUtils.checkPassword(password))
            throw new PasswordException('Password not valid')
        else {
            this.password = sha256(password).toString();
        }
    }

    public getPassword(): string {
        return this.password;
    }

    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public setEmail(email: string): void {
        if (!UserUtils.checkEmail(email))
            throw new EmailException('Email not valid')
        this.email = email;
    }

    public setBirthDate(birthDate: Date): void {
        if (!UserUtils.checkAge(birthDate))
            throw new AgeException('This user is under 13 years old')
        this.birthDate = birthDate;
    }

    public getBirthDate(): Date {
        return this.birthDate;
    }

    public isValidUser(): boolean {
        if (
            !this.firstName
            || !this.lastName
            || !this.email
            || !this.birthDate
            || !this.password
            || !(UserUtils.checkEmail(this.email))
            || !(UserUtils.checkAge(this.birthDate))
            || this.firstName.length === 0
            || this.lastName.length === 0
            || this.email.length === 0
            || this.password.length === 0
        ) {
            return false;
        } else {
            return true;
        }
    }
}