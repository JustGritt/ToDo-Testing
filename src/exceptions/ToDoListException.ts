export default class ToDoListException implements Error {
    constructor(message: string) {
        this.name = 'ToDoListException';
        this.message = message;
    }
    name: string;
    message: string;
    stack?: string | undefined;
}

export class ToDoListMaxReachedException extends ToDoListException {
    constructor(message: string) {
        super(message);
        this.name = 'ToDoListMaxReachedException';
        this.message = message;
    }
}

export class ToDoListDuplicateItemException extends ToDoListException {
    constructor(message: string) {
        super(message);
        this.name = 'ToDoListDuplicateItemException';
        this.message = message;
    }
}

export class ToDoListItemAddRateLimitException extends ToDoListException {
    constructor(message: string) {
        super(message);
        this.name = 'ToDoListItemAddRateLimitException';
        this.message = message;
    }
}
