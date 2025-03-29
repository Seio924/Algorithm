'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');

function plusAll(eq) {
  const numberList = eq.split('+').map(Number);
  return numberList.reduce((acc, curr) => acc + curr);
}

function solution(input) {
  const minusArea = input.split('-');
  let result = plusAll(minusArea.shift());

  minusArea.forEach(area => {
    result -= plusAll(area);
  });

  return result;
}

console.log(solution(input[0]));
