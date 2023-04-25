class ToDoList {
    private items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }

    public addItem(item: Item): void {
        this.items.push(item);
    }
}