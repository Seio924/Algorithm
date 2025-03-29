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
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(item) {
    const node = new Node(item);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.size += 1;
  }

  length() {
    return this.size;
  }

  popLeft() {
    if (this.empty() == 1) {
      return -1;
    }
    const node = this.head;
    this.head = this.head.next;
    this.size -= 1;
    return node.item;
  }

  front() {
    if (this.empty() == 1) return -1;
    return this.head.item;
  }

  back() {
    if (this.empty() == 1) return -1;
    return this.tail.item;
  }

  empty() {
    if (this.head === null) {
      return 1;
    }
    return 0;
  }
}

function solution() {
  let answer = [];
  const queue = new Queue();

  for (let command of input) {
    const c = command.split(' ');
    switch (c[0]) {
      case 'push':
        queue.push(c[1]);
        break;
      case 'pop':
        answer.push(queue.popLeft());
        break;
      case 'size':
        answer.push(queue.length());
        break;
      case 'empty':
        answer.push(queue.empty());
        break;
      case 'front':
        answer.push(queue.front());
        break;
      case 'back':
        answer.push(queue.back());
        break;
    }
  }

  return answer;
}

const answer = solution();
console.log(answer.join('\n'));
