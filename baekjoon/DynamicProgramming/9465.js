'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');
const T = Number(input.shift());

function solution(N, original) {
  const result = [];
  const dp = Array.from({ length: 2 }, () => Array(N).fill(0));
  dp[0][0] = original[0][0];
  dp[1][0] = original[1][0];

  for (let j = 1; j < N; j++) {
    for (let i = 0; i < 2; i++) {
      dp[i][j] = Math.max(dp[i + (-1) ** i][j - 1] + original[i][j], dp[i][j]);
      if (j + 1 < N)
        dp[i][j + 1] = Math.max(dp[i + (-1) ** i][j - 1] + original[i][j + 1], dp[i][j + 1]);
    }
  }

  dp.forEach(l => result.push(Math.max(...l)));
  return Math.max(...result);
}

for (let i = 0; i < T; i++) {
  const N = Number(input.shift());
  const original = [];
  original.push(input.shift().split(' ').map(Number));
  original.push(input.shift().split(' ').map(Number));

  console.log(solution(N, original));
}
