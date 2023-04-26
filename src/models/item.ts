import _ from "lodash";
import { ItemsMaxLengthNameReachedException } from "../exceptions/ItemException";

export class Item {
    private name: string;
    private content: string;
    private createdAt: number;

    constructor(name: string, content: string) {
        this.setName(name);
        this.setContent(content);
        this.setCreatedAt();
    }

    getName(): string {
        return this.name;
    }

    getContent(): string {
        return this.content;
    }

    getCreatedAt(): number {
        return this.createdAt;
    }

    setName(name: string): void {
        this.name = name;
    }

    setContent(content: string): void {
        if (_(content).size() > 1000)
            throw new ItemsMaxLengthNameReachedException('Content is limited to 1000 characters');
        this.content = content;
    }

    setCreatedAt(): void {
        this.createdAt = Date.now();
    }
}