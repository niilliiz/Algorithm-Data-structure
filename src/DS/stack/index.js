export default class Stack {
    length;
    head;
    constructor() {
        this.length = 0;
        this.head = undefined;
    }
    push(value) {
        const node = { value };
        if (this.isEmpty()) {
            this.length++;
            this.head = node;
            return;
        }
        this.length++;
        node.prev = this.head;
        this.head = node;
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.length--;
        const poppedNode = this.head;
        this.head = this.head.prev;
        poppedNode.prev = undefined;
        return poppedNode.value;
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.head.value;
    }
    isEmpty() {
        return this.length === 0;
    }
    size() {
        return this.length;
    }
}
