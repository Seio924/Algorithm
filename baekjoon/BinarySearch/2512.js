'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');
const N = Number(input.shift());
const sortedList = input
  .shift()
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
const maxBudget = Number(input.shift());
const div = Math.floor(maxBudget / N);

function binarySearch(sortedList, div) {
  const lowData = [];
  const highData = [];
  const start = 0;
  let end;
  let mid;

  while (sortedList.length !== 0) {
    end = sortedList.length - 1;
    mid = Math.floor((start + end) / 2);

    if (sortedList[mid] <= div) {
      lowData.push(...sortedList.splice(0, mid + 1));
    } else {
      highData.unshift(...sortedList.splice(mid, sortedList.length - mid));
    }
  }

  return [lowData, highData];
}

function solution(sortedList, maxBudget, div) {
  let lowData = [];
  let highData = [...sortedList];
  let remainBudget;
  let upperLimit = div;

  while (1) {
    const [low, high] = binarySearch([...highData], upperLimit);
    if (high.length === highData.length) break;

    lowData.push(...low);
    highData = [...high];

    if (lowData.length === 0) {
      remainBudget = maxBudget;
    } else {
      remainBudget = maxBudget - lowData.reduce((a, b) => a + b);
    }

    upperLimit = Math.floor(remainBudget / highData.length);
  }

  if (highData.length === 0) {
    return lowData[lowData.length - 1];
  } else {
    return upperLimit;
  }
}

console.log(solution(sortedList, maxBudget, div));
