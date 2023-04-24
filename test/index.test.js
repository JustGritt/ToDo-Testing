import { expect, test } from 'vitest';
import User from '../user';

test('Create user', () => {
    const user = new User('johndoe@mail.com', 'John', 'Doe', new Date('2000-01-01'));
    expect(user.email).toBe('johndoe@mail.com');
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.birthDate).toEqual(new Date('2000-01-01'));
});

test('User mail is valid', () => {
    const user = new User('johndoe@mail.com', 'John', 'Doe', new Date('2000-01-01'));
    expect(user.isMailValid()).toBe(true);
});

test('User mail is not valid', () => {
    const user = new User('johndoe', 'John', 'Doe', new Date('2000-01-01'));
    expect(user.isMailValid()).toBe(false);
});

test('User age is above 13', () => {
    const user = new User('johndoe@mail.com', 'John', 'Doe', new Date('2000-01-01'));
    expect(user.isAbove13()).toBe(true);
});

test('User age is below 13', () => {
    const user = new User('johndoe@mail.com', 'John', 'Doe', new Date('2010-01-01'));
    expect(user.isAbove13()) === false;
});