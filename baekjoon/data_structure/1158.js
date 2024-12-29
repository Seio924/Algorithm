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
  }

  push(item) {
    const node = new Node(item);
    if (this.head === null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.tail.next = this.head;
  }

  pop(loc) {
    let node = this.head;
    let prev;

    for (let i = 0; i < loc - 1; i++) {
      prev = node;
      node = node.next;
    }

    if (prev) {
      prev.next = node.next;
    }

    this.head = node.next;
    return node.item;
  }
}

function solution(n, k) {
  const queue = new Queue();
  let answer = [];

  for (let i = 1; i <= n; i++) {
    queue.push(i);
  }

  for (let i = 1; i <= n; i++) {
    const num = queue.pop(k);
    answer.push(num);
  }

  return answer;
}

const i = input[0].split(' ');
const answer = solution(i[0], i[1]);
console.log('<' + answer.join(', ') + '>');
