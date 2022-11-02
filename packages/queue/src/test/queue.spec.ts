import { Queue } from "..";

describe("queue class", () => {
  it("should create a queue with 1 head and 5 for tail value", () => {
    const queue = new Queue<number>();

    queue.add(1);
    queue.add(2);
    queue.add(3);
    queue.add(4);
    queue.add(5);
   
    expect(queue.getTail()).toBe(5);
    expect(queue.getHead()).toBe(1);
  });

  it("should decrease head value ", () => {
    const queue = new Queue<number>();

    queue.add(1);
    queue.add(2);
    queue.add(3);
    queue.add(4);
    queue.add(5);

    expect(queue.getHead()).toBe(1);
    queue.pop();
    expect(queue.getHead()).toBe(2);
    queue.pop();
    expect(queue.getHead()).toBe(3);
    queue.pop();
    expect(queue.getHead()).toBe(4);
    queue.pop();
    expect(queue.getHead()).toBe(5);
    queue.pop();
    expect(queue.getHead()).toBeUndefined();
  });
});
