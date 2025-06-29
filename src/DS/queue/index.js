export class Queue {
    length;
    head;
    tail;
    size;
    constructor(size) {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
        this.size = size;
    }
    enqueue(value) {
        if (this.isFull()) {
            return;
        }
        const node = { value };
        if (this.isEmpty()) {
            this.head = this.tail = node;
            this.length++;
            return;
        }
        this.length++;
        this.tail.next = node;
        this.tail = node;
    }
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const outNode = this.head;
        if (this.head === this.tail) {
            this.head = this.tail = undefined;
        }
        else {
            this.head = this.head.next;
        }
        this.length--;
        outNode.next = undefined; // safe now
        return outNode.value;
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
    isFull() {
        return this.length === this.size;
    }
    getSize() {
        return this.length;
    }
}
