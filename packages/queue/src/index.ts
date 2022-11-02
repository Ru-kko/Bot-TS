import { i } from "vitest/dist/index-220c1d70";

export class Queue<T> {
  private head?: ListNode<T>;
  private tail?: ListNode<T>;

  add(v: T) {
    const node = new ListNode(v);
    if (!this.head) {
      this.head = node;
      return;
    }
    if (!this.tail) {
      this.head.setPrevious(node);
      this.tail = node;
      return;
    }

    node.setNext(this.tail);
    this.tail.setPrevious(node);
    this.tail = node;
  }

  pop() {
    if (!this.head || !this.tail) return;
    
    this.head = this.head.getPrevious();
    this.head?.setNext();
    
    if (!this.head?.getPrevious()) this.tail = undefined;
  }

  getHead() {
    return this.head?.getValue();
  }

  getTail() {
    return this.tail?.getValue();
  }
}

class ListNode<T> {
  private next?: ListNode<T>;
  private previous?: ListNode<T>;

  constructor(private value?: T) {}

  getValue() {
    return this.value;
  }

  setValue(v?: T) {
    this.value = v;
  }

  setNext(v?: ListNode<T>) {
    this.next = v;
  }

  setPrevious(v: ListNode<T>) {
    this.previous = v;
  }

  getNext() {
    return this.next;
  }

  getPrevious() {
    return this.previous;
  }
}
