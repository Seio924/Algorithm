'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');
const parentheses = input[0].split('()').join('|');
const stack = [];
let answer = 0;

for (let p of parentheses) {
  if (p === '|') {
    answer += stack.length;
  } else if (p === '(') {
    stack.push('(');
  } else if (p === ')') {
    stack.pop();
    answer += 1;
  }
}

console.log(answer);
