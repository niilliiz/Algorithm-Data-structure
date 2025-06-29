export default class SinglyLinkedList {
    length;
    head;
    size;
    constructor(size) {
        this.length = 0;
        this.head = undefined;
        this.size = size;
    }
    traverse(position) {
        if (this.isEmpty())
            return null;
        let currentNode = this.head;
        if (position === undefined) {
            while (currentNode?.next) {
                currentNode = currentNode.next;
            }
            return currentNode;
        }
        if (position < 0 || position >= this.length) {
            return null;
        }
        let count = 0;
        while (count < position && currentNode) {
            currentNode = currentNode.next;
            count++;
        }
        return currentNode;
    }
    insertAtBeginning(value) {
        if (this.isFull()) {
            return;
        }
        const node = { value };
        if (this.isEmpty()) {
            this.length++;
            this.head = node;
            return;
        }
        this.length++;
        const currentNode = this.head;
        this.head = node;
        node.next = currentNode;
    }
    insertAtMiddle(value, position) {
        if (this.isFull()) {
            return;
        }
        if (position === 0) {
            this.insertAtBeginning(value);
            return;
        }
        else if (position === this.length - 1) {
            return this.insertAtEnd(value);
        }
        const node = { value };
        const prevNode = this.traverse(position - 1);
        if (prevNode) {
            this.length++;
            node.next = prevNode.next;
            prevNode.next = node;
        }
        else {
            return null;
        }
    }
    insertAtEnd(value) {
        if (this.isFull()) {
            return;
        }
        if (this.isEmpty()) {
            return this.insertAtBeginning(value);
        }
        const node = { value };
        const lastNode = this.traverse();
        this.length++;
        lastNode.next = node;
        node.next = undefined;
    }
    deleteAtBeginning() {
        if (this.isEmpty()) {
            return;
        }
        this.length--;
        const outNode = this.head;
        this.head = outNode.next;
        outNode.next = undefined;
        return outNode.value;
    }
    deleteAtEnd() {
        if (this.isEmpty()) {
            return;
        }
        if (this.length === 1) {
            return this.deleteAtBeginning();
        }
        const prevNode = this.traverse(this.length - 2);
        const lastNode = prevNode.next;
        prevNode.next = undefined;
        this.length--;
        return lastNode.value;
    }
    deleteAtMiddle(position) {
        if (this.isEmpty()) {
            return;
        }
        if (position < 0 || position >= this.length) {
            return;
        }
        if (position === 0) {
            return this.deleteAtBeginning();
        }
        if (position === this.length - 1) {
            return this.deleteAtEnd();
        }
        const prevNode = this.traverse(position - 1);
        const outNode = prevNode.next;
        if (prevNode) {
            prevNode.next = outNode.next;
            this.length--;
            return outNode.value;
        }
        else {
            return null;
        }
    }
    isFull() {
        return this.size === this.length;
    }
    isEmpty() {
        return this.length === 0;
    }
}
