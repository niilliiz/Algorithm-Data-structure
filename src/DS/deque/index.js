export class DeQueue {
    length;
    size;
    head;
    tail;
    constructor(size) {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
        this.size = size;
    }
    addHead(value) {
        if (this.isFull()) {
            return;
        }
        const node = { value };
        if (this.isEmpty()) {
            this.length++;
            this.head = this.tail = node;
            return;
        }
        this.length++;
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }
    addTail(value) {
        if (this.isFull()) {
            return;
        }
        if (this.isEmpty()) {
            this.addHead(value);
            return;
        }
        const node = { value };
        this.length++;
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
    removeHead() {
        if (this.isEmpty()) {
            return;
        }
        const outNode = this.head;
        this.length--;
        if (this.head === this.tail) {
            this.tail = this.head = undefined;
            outNode.next = outNode.prev = undefined;
            return outNode.value;
        }
        this.head = outNode.next;
        this.head.prev = undefined;
        outNode.next = outNode.prev = undefined;
        return outNode.value;
    }
    removeTail() {
        if (this.isEmpty()) {
            return;
        }
        if (this.head === this.tail) {
            return this.removeHead();
        }
        const outNode = this.tail;
        this.length--;
        this.tail = outNode.prev;
        this.tail.next = undefined;
        outNode.prev = undefined;
        return outNode.value;
    }
    peekHead() {
        return this.head?.value;
    }
    peekTail() {
        return this.tail?.value;
    }
    isEmpty() {
        return this.length === 0;
    }
    isFull() {
        return this.size === this.length;
    }
    getSize() {
        return this.size;
    }
}
