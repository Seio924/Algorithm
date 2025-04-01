'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');

const [N, M, V] = input.shift().split(' ').map(Number);
const edges = input.map(v => v.split(' ').map(Number));
const graph = [...Array(N + 1)].map(() => []);
edges.forEach(([from, to]) => {
  graph[from].push(to);
  graph[to].push(from);
});

const visited_dfs = [];
const visited_bfs = [];

function dfs(v) {
  const stack = [v];
  const visited = Array(N + 1).fill(false);

  while (stack.length !== 0) {
    const node = stack.pop();

    if (!visited[node]) {
      visited_dfs.push(node);
      visited[node] = true;
      graph[node].forEach(n => stack.push(n));
    }
  }
}

function bfs(v) {
  const queue = [v];
  const visited = Array(N + 1).fill(false);

  while (queue.length !== 0) {
    const node = queue.shift();

    if (!visited[node]) {
      visited_bfs.push(node);
      visited[node] = true;
      graph[node].forEach(n => queue.push(n));
    }
  }
}

graph.forEach(v => v.sort((a, b) => b - a));
dfs(V);
console.log(visited_dfs.join(' '));

graph.forEach(v => v.sort((a, b) => a - b));
bfs(V);
console.log(visited_bfs.join(' '));
