'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');

function substitution(arr) {
  if (arr.length === 0) return '';
  const hasK = arr.find(element => element === 'K');
  let countM = arr.filter(element => 'M' === element).length;

  if (hasK) {
    return String(5n * 10n ** BigInt(countM));
  }

  return String(10n ** BigInt(countM - 1));
}

function findMaxValue(input) {
  const section = [];
  const copy = [...input];
  let length = 0;
  let result = '';

  input.forEach(element => {
    length += 1;
    if (element === 'K') {
      section.push(copy.splice(0, length));
      length = 0;
    }
  });

  copy.forEach(element => section.push([element]));

  section.forEach(element => {
    result += substitution(element);
  });

  return result;
}

function findMinValue(input) {
  const section = [];
  const copy = [...input];
  let length = 0;
  let result = '';

  input.forEach(element => {
    if (element === 'K') {
      section.push(copy.splice(0, length));
      section.push([copy.shift()]);
      length = 0;
    } else length += 1;
  });

  section.push([...copy]);

  section.forEach(element => {
    result += substitution(element);
  });

  return result;
}

console.log(findMaxValue([...input[0]]));
console.log(findMinValue([...input[0]]));
