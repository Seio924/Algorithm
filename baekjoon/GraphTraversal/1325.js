'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const [input, ...arr] = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');
const [N, M] = input.split(' ').map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [front, back] = arr[i].split(' ');
  graph[+back].push(+front);
}

function dfs(v) {
  const stack = [v];
  const visited = Array(N + 1).fill(false);
  visited[v] = true;
  let visitCount = 1;

  while (stack.length !== 0) {
    const node = stack.pop();

    for (let next of graph[node]) {
      if (!visited[next]) {
        visited[next] = true;
        stack.push(next);
        visitCount += 1;
      }
    }
  }

  return visitCount;
}

const visitCounts = [];
const result = [];

for (let i = 1; i <= N; i++) {
  visitCounts.push(dfs(i));
}

const max = Math.max(...visitCounts);

for (let i = 0; i < visitCounts.length; i++) {
  if (visitCounts[i] === max) {
    result.push(i + 1);
  }
}

console.log(result.join(' '));
