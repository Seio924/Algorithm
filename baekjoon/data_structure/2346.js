// 실패 -> 메모리 초과 (js 언어 자체 문제로 풀기 어려움)
'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');

class Node {
  constructor(index, item) {
    this.index = index;
    this.item = item;
    this.next = null;
    this.prev = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(index, item) {
    const node = new Node(index, item);
    if (this.head === null) {
      this.head = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
    }
    this.tail = node;
    this.head.prev = this.tail;
  }

  moveForwardPop(loc) {
    let node = this.head;

    for (let i = 0; i < loc - 1; i++) {
      node = node.next;
    }

    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    this.head = node.next;

    return { index: node.index, item: node.item };
  }

  moveBackPop(loc) {
    let node = this.head;

    for (let i = 0; i < loc; i++) {
      node = node.prev;
    }

    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    this.head = node.next;

    return { index: node.index, item: node.item };
  }
}

function solution(n, balloonNumbers) {
  const queue = new Queue();
  const numbers = balloonNumbers.split(' ');
  const answer = [];

  for (let i = 0; i < n; i++) {
    queue.push(i + 1, Number(numbers[i]));
  }

  let { index, item } = queue.moveForwardPop(1);
  answer.push(index);

  for (let i = 0; i < n - 1; i++) {
    let value;
    if (item < 0) {
      value = queue.moveBackPop(item * -1);
    } else if (item > 0) {
      value = queue.moveForwardPop(item);
    }
    answer.push(value.index);
    item = value.item;
  }

  return answer;
}

const n = input[0];
const balloonNumbers = input[1];
const answer = solution(n, balloonNumbers);
console.log(answer.join(' '));
