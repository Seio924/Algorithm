'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');

function solution() {
    
}

function check(left, right) {
  if (left === '(' && right === ')') {
    return 2;
  } else if (left === '[' && right === ']') {
    return 3;
  }
  return -1;
}
