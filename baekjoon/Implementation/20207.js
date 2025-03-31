'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');
input.shift();

function solution(input) {
  const dayList = Array(366).fill(0);

  input.forEach(schedule => {
    const day = schedule.split(' ').map(Number);

    for (let i = day[0]; i <= day[1]; i++) {
      dayList[i] += 1;
    }
  });

  let width = 0;
  let height = 0;
  let area = 0;

  for (let i = 1; i <= dayList.length; i++) {
    if (dayList[i] > 0) {
      width += 1;
      height = Math.max(height, dayList[i]);
    } else {
      area += width * height;
      width = 0;
      height = 0;
    }
  }

  area += width * height;
  return area;
}

console.log(solution(input));
