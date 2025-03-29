'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');
const N = input.shift();

function VPSChecker(command) {
  let stack = [];
  for (let parenthesis of command) {
    if (parenthesis === ')') {
      if (!stack.pop()) {
        return 0;
      }
    } else {
      stack.push(parenthesis);
    }
  }

  if (stack.length == 0) {
    return 1;
  }
  return 0;
}

function solution(input) {
  for (let command of input) {
    if (VPSChecker(command)) {
      console.log('YES');
    } else {
      console.log('NO');
    }
  }
}

solution(input);
