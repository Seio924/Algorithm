'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n').map(Number);
const N = input.shift();

function solution(N, sequence) {
  const stack = [];
  const answer = [];
  let num = sequence.pop();

  for (let i = 1; i <= N; i++) {
    stack.push(i);
    answer.push('+');

    while (stack.length > 0) {
      if (stack[stack.length - 1] === num) {
        stack.pop();
        num = sequence.pop();
        answer.push('-');
      } else {
        break;
      }
    }
  }

  if (stack.length > 0) {
    return null;
  }
  return answer;
}

const answer = solution(N, input.reverse());

if (answer) {
  console.log(answer.join('\n'));
} else {
  console.log('NO');
}
