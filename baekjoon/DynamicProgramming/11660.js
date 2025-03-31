'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');
const condition = input.shift().split(' ').map(Number);
const n = condition[0];
const m = condition[1];

function solution(input, n, m) {
  const numberList = [];
  const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i < n; i++) {
    const temp = input.shift().split(' ').map(Number);
    numberList.push(temp);
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1] + numberList[i - 1][j - 1];
    }
  }

  for (let i = 0; i < m; i++) {
    const loc = input[i].split(' ').map(Number);
    const x1 = loc[0];
    const y1 = loc[1];
    const x2 = loc[2];
    const y2 = loc[3];

    console.log(dp[x2][y2] - dp[x1 - 1][y2] - dp[x2][y1 - 1] + dp[x1 - 1][y1 - 1]);
  }
}

solution(input, n, m);
