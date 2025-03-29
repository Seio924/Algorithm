'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');
const N = input.shift();

class Stack {
  constructor() {
    this.arr = [];
    this.size = 0;
  }

  push(item) {
    this.arr.push(item);
    this.size += 1;
  }

  pop() {
    if (this.empty()) {
      return -1;
    }
    this.size -= 1;
    return this.arr.pop();
  }

  length() {
    return this.size;
  }

  empty() {
    if (this.length() == 0) {
      return 1;
    }
    return 0;
  }

  top() {
    if (this.empty()) {
      return -1;
    }
    return this.arr[this.size - 1];
  }
}

function solution(input) {
  let answer = [];
  const stack = new Stack();

  for (let command of input) {
    const c = command.split(' ');

    switch (c[0]) {
      case 'push':
        stack.push(c[1]);
        break;
      case 'pop':
        answer.push(stack.pop());
        break;
      case 'size':
        answer.push(stack.length());
        break;
      case 'empty':
        answer.push(stack.empty());
        break;
      case 'top':
        answer.push(stack.top());
        break;
    }
  }

  return answer;
}

const answer = solution(input);
console.log(answer.join('\n'));
