'use strict';
const fs = require('fs');

// 백준 제출 할 때 주석 제거
// const readFileSyncAddress = '/dev/stdin';

// VSC 테스트 할 때 주석 제거
const readFileSyncAddress = 'input.txt';

const input = fs.readFileSync(readFileSyncAddress).toString().trim().split('\n');

let stack = [];

function findAndDelete(search) {
  const index = stack.indexOf(search);

  if (index !== -1) {
    stack.splice(index, 1);
    return true;
  }

  return false;
}

function solution(input) {
  let result = 0;
  let isSound = true;

  input.forEach(sound => {
    switch (sound) {
      case 'q':
        if (!findAndDelete('k')) result += 1;
        break;

      case 'u':
        if (!findAndDelete('q')) {
          isSound = false;
          return;
        }
        break;

      case 'a':
        if (!findAndDelete('u')) {
          isSound = false;
          return;
        }
        break;

      case 'c':
        if (!findAndDelete('a')) {
          isSound = false;
          return;
        }
        break;

      case 'k':
        if (!findAndDelete('c')) {
          isSound = false;
          return;
        }
        break;
    }

    stack.push(sound);
  });

  if (!isSound || stack.some(sound => sound !== 'k')) return -1;
  return result;
}

console.log(solution([...input[0]]));
