'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');
const N = input.shift();

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  pushFront(item) {
    const node = new Node(item);
    if (this.empty()) {
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
    }

    this.head = node;
    this.size += 1;
  }

  pushBack(item) {
    const node = new Node(item);
    if (this.empty()) {
      this.head = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
    }

    this.tail = node;
    this.size += 1;
  }

  popFront() {
    if (this.empty()) {
      return -1;
    }
    const node = this.head;
    this.head = this.head.next;
    if (this.head !== null) this.head.prev = null;
    this.size -= 1;

    return node.item;
  }

  popBack() {
    if (this.empty()) {
      return -1;
    }
    const node = this.tail;
    this.tail = this.tail.prev;
    if (this.tail !== null) this.tail.next = null;
    this.size -= 1;

    return node.item;
  }

  length() {
    return this.size;
  }

  empty() {
    if (this.size == 0) {
      return 1;
    }
    return 0;
  }

  front() {
    if (this.empty()) {
      return -1;
    }
    return this.head.item;
  }

  back() {
    if (this.empty()) {
      return -1;
    }
    return this.tail.item;
  }
}

function solution(input) {
  const deque = new Deque();
  let answer = [];

  for (let command of input) {
    const c = command.split(' ');
    switch (c[0]) {
      case 'push_front':
        deque.pushFront(c[1]);
        break;
      case 'push_back':
        deque.pushBack(c[1]);
        break;
      case 'pop_front':
        answer.push(deque.popFront());
        break;
      case 'pop_back':
        answer.push(deque.popBack());
        break;
      case 'size':
        answer.push(deque.length());
        break;
      case 'empty':
        answer.push(deque.empty());
        break;
      case 'front':
        answer.push(deque.front());
        break;
      case 'back':
        answer.push(deque.back());
        break;
    }
  }

  return answer;
}

const answer = solution(input);
console.log(answer.join('\n'));
