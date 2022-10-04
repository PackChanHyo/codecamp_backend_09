function solution(n) {
  const answer = [];
  let prev = 0; // 피보나치 0번째 숫자를 의미
  let next = 1; // 피보나치 1번째 숫자를 의미
  let sum = 1;

  for (let i = 2; i <= n; i++) {
    sum = (prev + next) % 1234567;
    prev = next;
    next = sum;
    answer.push(sum);
  }
  return answer[n - 2];
}

// n	return
// 3	2
// 5	5

// 메소드 활용하기
// function solution(n) {
// let prev = 0; // 피보나치 0번째 숫자를 의미
// let next = 1; // 피보나치 1번째 숫자를 의미
// let sum = 1;
//
// const answer = new Array(n - 1).fill(1).reduce((acc) => {
// sum = (prev + acc) % 1234567;
// prev = acc;
// return sum
// },sum)
//    return answer
// }
