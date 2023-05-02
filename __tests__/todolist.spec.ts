import { ToDoList } from '../src/models/todolist';
import { Item } from '../src/models/item';
import { ItemsMaxLengthNameReachedException } from '../src/exceptions/ItemException';
import ToDoListMaxReachedException from '../src/exceptions/ToDoListException';
import UserException, { DuplicatedToDoListException } from '../src/exceptions/UserException';
import mockEmailSenderService from '../__mocks__/mockEmailSenderService';
import { user } from './user.spec';

beforeEach(async () => {
    jest.useFakeTimers();
    mockEmailSenderService.mockClear();
});

describe('ToDoList', () => {

    describe('ToDoList parameters', () => {

        it('A user should only have one ToDoList', () => {
            const todoList = new ToDoList([]);
            todoList.setUser(user);
            user.setTodolist(todoList);
            expect(() => user.setTodolist(todoList)).toThrow(UserException);
            expect(() => user.getTodolist()).not.toThrow(UserException);

            const newList = new ToDoList([]);
            expect(() => user.setTodolist(newList)).toThrow(DuplicatedToDoListException);
        });

        it('Should return an exception if it contains more than 10 items', () => {
            const todoList = new ToDoList([]);
            const items = Array.from({ length: 11 }, (_, i) => new Item(`Item ${i + 1}`, 'Content'));
            expect(() => todoList.addAllItems(items)).toThrow(ToDoListMaxReachedException);
        });

        it('Should not return an exception if it contains only 4 elements', () => {
            const todoList = new ToDoList([]);
            for (let i = 0; i < 4; i++) {
                jest.advanceTimersByTime(1800000);
                todoList.addItem(new Item(`Item ${i + 1}`, 'Content'));
            }
            expect(todoList.getItems().length).toBe(4);

            jest.advanceTimersByTime(1800000);
            expect(() => todoList.addItem(new Item(`Item 5`, 'Content'))).not.toThrow(ToDoListMaxReachedException);
        });
    });

    describe('ToDoList items', () => {
        it('Should return an exception if it contains duplicate items', () => {
            const todoList = new ToDoList([]);
            const items = Array.from({ length: 4 }, (_, i) => new Item(`Item ${i + 1}`, 'Content'));
            expect(() => todoList.addAllItems(items)).toThrow(ToDoListMaxReachedException);
        });

        it('An item should have a content with less than 1000 letters', () => {
            const todoList = new ToDoList([]);
            const item = new Item('Item 1', 'Content');
            expect(() => item.setContent('a'.repeat(1001))).toThrow(ItemsMaxLengthNameReachedException);
        });
    });

    describe('ToDoList add new item', () => {
        it('Should add a new item', () => {
            const todoList = new ToDoList([]);
            const item = new Item('Item 1', 'Content');
            todoList.addItem(item);
            jest.advanceTimersByTime(1800000);
            expect(todoList.getItems().length).toBe(1);
        });

        it('Should not be added if the user is not valid', () => {
            invalidUser.setTodolist(new ToDoList([]));
            const item = new Item('Item 1', 'Content');
            expect(() => invalidUser.getTodolist().addItem(item)).toThrow(UserException);
        });

        it('Should wait 30 minutes before adding a new item', () => {
            const todoList = new ToDoList([]);
            const item = new Item('Item 1', 'Content');
            expect(todoList.getItems().length).toBe(0);
            todoList.addItem(item);
            expect(todoList.getItems().length).toBe(1);

            jest.advanceTimersByTime(1800000);
            expect(() => todoList.addItem(new Item('Item 2', 'Content'))).not.toThrow(ToDoListMaxReachedException);
            expect(() => todoList.addItem(new Item('Item 3', 'Content'))).toThrow(ToDoListMaxReachedException);
        });
    });
});
