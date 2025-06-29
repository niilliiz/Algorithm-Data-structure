export default class DoublyLinkedList {
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
    insertAtBeginning(value) { }
    insertAtMiddle(value, position) { }
    insertAtEnd(value) { }
    deleteAtBeginning() { }
    deleteAtEnd() { }
    deleteAtMiddle(position) { }
    isFull() {
        return this.size === this.length;
    }
    isEmpty() {
        return this.length === 0;
    }
}
