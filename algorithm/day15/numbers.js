function solution(numbers) {
  return numbers.reduce((acc, cur) => acc - cur, 45);
}

solution([1, 2, 3, 4, 6, 7, 8, 0]);

// for문 방식
// function solution(numbers) {
//    let answer = 0;
// for(let i = 1; i <= 9; i++){
// if(!numbers.includes(i)){
// answer += i
// }
// }
// return answer
// }

// new Array 방식
// function solution(numbers) {
// const answer = new Array(9).fill(1).reduce((acc,cur,idx) => {
// const sum = cur + idx
// return acc + (numbers.includes(sum) ? 0 : sum)
// },0)
// return answer
//  }
