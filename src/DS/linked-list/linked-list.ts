// tsx src/DS/linked-list/linked-list.ts command

import {
  ILinkedList,
  ILinkedListNode,
} from "../../interfaces/interface-linked-list";

class LinkedList<T> implements ILinkedList<T> {
  x: number = 5;
  y: number = 44;
}

const ll = new LinkedList();

interface Person1 {
  readonly name?: string;
}

function greet(person: Person) {
  console.log(person.age);
  person.age = "55";
}

type Person = {
  age?: string;
};
