'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');

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
    if (item === null) return;

    const node = new Node(item);
    if (this.head === null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.size += 1;
  }

  popLeft() {
    if (this.empty()) {
      return null;
    }
    const node = this.head;
    this.head = this.head.next;
    this.size -= 1;

    return node.item;
  }

  empty() {
    if (this.size == 0) {
      return 1;
    }
    return 0;
  }
}

function solution(n) {
  const queue = new Queue();
  let answer;

  for (let i = 1; i <= n; i++) {
    queue.push(i);
  }

  while (!queue.empty()) {
    answer = queue.popLeft();
    queue.push(queue.popLeft());
  }

  return answer;
}

const answer = solution(Number(input[0]));
console.log(answer);
