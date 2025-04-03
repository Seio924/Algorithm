'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
// const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');
const N = Number(input.shift());

const element = [];
input.forEach(flavor => {
  element.push(flavor.split(' ').map(Number));
});

let diff = 1000000000;

const graph = Array.from({ length: N }, () => []);

for (let i = 1; i < N; i++) {
  for (let j = i; j < N; j++) {
    graph[i - 1].push(j);
  }
}

function updateDiff(sour, bitter) {
  const tempDiff = Math.abs(sour - bitter);
  if (tempDiff < diff) diff = tempDiff;
}

function dfs(v, sour, bitter) {
  updateDiff(sour, bitter);
  if (graph[v].length === 0) return;

  for (let node of graph[v]) {
    dfs(node, sour * element[node][0], bitter + element[node][1]);
  }
}

element.forEach((flavor, index) => dfs(index, flavor[0], flavor[1]));

console.log(diff);
