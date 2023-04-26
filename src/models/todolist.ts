import _ from 'lodash'
import { ToDoListDuplicateItemException, ToDoListItemAddRateLimitException, ToDoListMaxReachedException } from '../exceptions/ToDoListException';
import { Item } from './item';
import { EmailSenderService } from '..//services/EmailSenderService';
export class ToDoList {
    private items: Item[] = [];
    

    constructor(items: Item[]) {
        this.addAllItems(items)
    }

    public addAllItems(items: Item[]): void {
        if (_.size(items) > 10)
            throw new ToDoListMaxReachedException('Max number of items reached')
        else {
            _.forEach(items, (item: Item) => {
                if (_.filter(this.items, (i: Item) => i.getName() === item.getName()).length === 0) {
                    this.addItem(item);
                } else {
                    throw new ToDoListDuplicateItemException('Duplicate item')
                }
            })
        }
    }

    public addItem(item: Item): void {
        const item_ = _(this.items).last()
        // check if item exists and its createdAt is less than 1 minute
        if ((this.items.length === 0 || (item_ && (item.getCreatedAt() - item_.getCreatedAt()) >= 1800000))) {
            this.items.push(item);
            if (this.items.length === 8) {
                const emailSenderService = new EmailSenderService()
                emailSenderService.sendEmail('a', 'You have 2 items left to complete', )
            }
        } else {
            throw new ToDoListItemAddRateLimitException('Wait 1 minute before adding another item')
        }
    }

    public getItems(): Item[] {
        return this.items;
    }

}