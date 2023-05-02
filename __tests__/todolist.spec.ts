import { ToDoList } from '../src/models/todolist';
import ToDoListMaxReachedException, { ToDoListDuplicateItemException, ToDoListItemAddRateLimitException } from '../src/exceptions/ToDoListException';
import { Item } from '../src/models/item';
import { fakeTimerBetweenAddingUser } from '../__mocks__/fakers';
import User from '../src/models/user';
import { user } from './user.spec';
import UserException, { DuplicatedToDoListException, EmailException } from '../src/exceptions/UserException';
import mockEmailSenderService from '../__mocks__/mockEmailSenderService';
import { EmailSenderService } from '../src/services/EmailSenderService';


beforeEach(async () => {
    jest.useFakeTimers();
    jest.spyOn(EmailSenderService.prototype, 'sendEmail');
    mockEmailSenderService.mockReset();
});

describe('ToDoList', () => {
    const todoList = new ToDoList([]);

    
    it('should throw exception if user not valid', () => {
        expect(() => user.setEmail('dssdsd')).toThrow(EmailException);
        user.setTodolist(todoList)
        expect(user.getTodolist()).toBe(todoList);
    });

    it('should add only one ToDoList per user', () => {
        todoList.setUser(user)
        expect(() => user.setTodolist(todoList)).toThrow(UserException);
    });
    
    it('should send an email when a user is adding the 8th item to his toDoList', () => {
        const todoList = new ToDoList([]);
        todoList.setUser(user)
        for (let i = 0; i < 9; i++) {
            jest.advanceTimersByTime(1800000);
            todoList.addItem(new Item(`Item ${i + 1}`, 'Content'));
        }
        expect(EmailSenderService.prototype.sendEmail).toBeCalled();
    });

    describe('constructor', () => {
        it('should throw an exception if the number of items passed in is greater than 10', () => {
            const items = Array.from({ length: 11 }, (_, i) => new Item(`Item ${i + 1}`, 'Content'));
            expect(() => todoList.addAllItems(items)).toThrow(ToDoListMaxReachedException);
        });

        it('should not add duplicate items to the list', () => {
            const item1 = new Item('Item 1', 'Content');
            const item2 = new Item('Item 1', 'Content');

            expect(() => todoList.addAllItems([item1, item2])).toThrow(ToDoListDuplicateItemException);
        });
    });
    describe('addItem', () => {
        const todoList = new ToDoList([]);
        it('should add an item to the list if the last item was created more than a minute ago', async () => {
            // Create an item and add it to the list then add another item to the list after 1 minute
            const item1 = new Item('Item 1', 'Content');
            const item2 = new Item('Item 3', 'Content');
            todoList.addItem(item1);
            expect(() => todoList.addItem(item2)).toThrow(ToDoListItemAddRateLimitException);
        });

        it('should throw an exception if the last item was created less than a 30 minutes ago', () => {
            const callback = () => {
                const item1 = new Item('Item 2', 'Content');
                todoList.addItem(item1);
            };

            fakeTimerBetweenAddingUser(callback);
            jest.runAllTimers();
            expect(todoList.getItems()).toHaveLength(2);
        });
    });
});
