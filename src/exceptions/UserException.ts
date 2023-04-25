export default class UserException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserException';
        this.message = message;
    }
}

export class EmailException extends UserException {
    constructor(message: string) {
        super(message);
        this.name = 'UserEmailException';
        this.message = message;
    }
}


export class PasswordException extends UserException {
    constructor(message: string) {
        super(message);
        this.name = 'UserPasswordException';
        this.message = message;
    }
}

export class AgeException extends UserException {
    constructor(message: string) {
        super(message);
        this.name = 'UserAgeException';
        this.message = message;
    }
}