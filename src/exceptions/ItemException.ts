export class ItemException implements Error {
    constructor(message: string) {
        this.name = 'ItemsException';
        this.message = message;
    }
    name: string;
    message: string;
    stack?: string | undefined;
}

export class ItemsMaxLengthNameReachedException extends ItemException {
    constructor(message: string) {
        super(message);
        this.name = 'ItemsMaxLengthNameReachedException';
        this.message = message;
    }
}