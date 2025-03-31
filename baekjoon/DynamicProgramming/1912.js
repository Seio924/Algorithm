'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');

function solution(input) {
  const n = Number(input[0]);
  const numList = input[1].split(' ').map(Number);
  const dp = Array(n).fill(0);
  dp[0] = numList[0];

  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(numList[i], numList[i] + dp[i - 1]);
  }

  return Math.max(...dp);
}

console.log(solution(input));
