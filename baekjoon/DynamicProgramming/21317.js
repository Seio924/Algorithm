'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');
const N = Number(input.shift());
const original = [];

for (let i = 0; i < N - 1; i++) {
  original.push(input.shift().split(' ').map(Number));
}

const K = Number(input.shift());

function makeDp(N, original, K) {
  const INF = 99999999;
  const dp = Array.from({ length: 2 }, () => Array(N + 1).fill(INF));

  dp[0][1] = 0;

  if (N >= 2) {
    dp[0][2] = dp[0][1] + original[1][0]; // 1번 → 2번
  }

  if (N >= 3) {
    dp[0][3] = Math.min(
      dp[0][2] + original[2][0], // 2번 → 3번
      dp[0][1] + original[1][1] // 1번 → 3번
    );
  }

  for (let i = 4; i <= N; i++) {
    dp[0][i] = Math.min(dp[0][i - 1] + original[i - 1][0], dp[0][i - 2] + original[i - 2][1]);
    dp[1][i] = Math.min(
      dp[1][i - 1] + original[i - 1][0],
      dp[1][i - 2] + original[i - 2][1],
      dp[0][i - 3] + K
    );
  }

  return dp;
}

function solution(N, original, K) {
  original.unshift([0, 0]);
  const dp = makeDp(N, original, K);
  return Math.min(dp[0][N], dp[1][N]);
}

console.log(solution(N, original, K));
