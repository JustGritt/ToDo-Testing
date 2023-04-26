export default class UserException implements Error {
    constructor(message: string) {
        this.name = 'UserException';
        this.message = message;
    }
    name: string;
    message: string;
    stack?: string | undefined;
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


export class DuplicatedToDoListException extends UserException {
    constructor(message: string) {
        super(message);
        this.name = 'DuplicatedToDoListException';
        this.message = message;
    }
}