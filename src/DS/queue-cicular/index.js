export class QueueCircular {
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
    enqueue(value) {
        if (this.isFull()) {
            return;
        }
        const node = { value };
        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
            this.tail.next = this.head;
            this.length++;
            return;
        }
        this.length++;
        this.tail.next = node;
        this.tail = node;
        this.tail.next = this.head;
        return;
    }
    dequeue() {
        if (this.isEmpty()) {
            return;
        }
        if (this.head === this.tail) {
            const outNode = this.head;
            this.head = this.tail = undefined;
            this.length--;
            return outNode.value;
        }
        this.length--;
        const outNode = this.head;
        this.head = outNode.next;
        this.tail.next = this.head;
        outNode.next = undefined;
        return outNode.value;
    }
    peek() {
        return this.head?.value;
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
