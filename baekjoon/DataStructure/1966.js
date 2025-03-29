'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');
const N = input.shift();

class Node {
  constructor(index, priority) {
    this.index = index;
    this.priority = priority;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(index, priority) {
    const node = new Node(index, priority);
    if (this.head === null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
  }

  popLeft() {
    if (this.head === null) {
      return null;
    }
    const node = this.head;
    this.head = this.head.next;
    return node;
  }

  hasHigherPriorityThan(priority) {
    let node = this.head;
    while (node) {
      if (priority < node.priority) {
        return 1;
      }
      if (node.next === null) {
        return 0;
      }
      node = node.next;
    }
  }
}

function solution(count, index, priorities) {
  const queue = new Queue();
  let answer = 0;

  for (let i = 0; i < count; i++) {
    queue.push(i, Number(priorities[i]));
  }

  while (true) {
    const node = queue.popLeft();

    if (queue.hasHigherPriorityThan(node.priority)) {
      queue.push(node.index, node.priority);
    } else {
      answer += 1;
      if (node.index == index) {
        break;
      }
    }
  }

  return answer;
}

let answer = [];
for (let i = 0; i < N * 2; i += 2) {
  const c = input[i].split(' ');
  answer.push(solution(Number(c[0]), Number(c[1]), input[i + 1].split(' ')));
}

console.log(answer.join('\n'));
