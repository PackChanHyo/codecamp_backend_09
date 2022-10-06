function solution(n) {
  // 1. 3진법으로 변환
  n = n.toString(3);

  // 2. 앞 뒤 반전 (뒤집기)
  let reverse = "";
  for (let i = n.length - 1; i >= 0; i--) {
    reverse += n[i];
  }
  return parseInt(reverse, 3);
}

solution(45);

// 메소드 활용하여 문제 풀기

// function solution(n) {
// n = n.toString(3).split('').reverse().join('')
// return parseInt(n,3)
// }

// let a = 45
// a.toString(3) // 해당 진법으로 변환

// parseInt(a,3) // n진법으로 표현된 숫자를 10진법으로 변환
