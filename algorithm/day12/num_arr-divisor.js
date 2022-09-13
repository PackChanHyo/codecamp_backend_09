function solution(arr, divisor) {
  const answer = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % divisor === 0) {
      answer.push(arr[i]);
    }
  }
  return answer.length === 0 ? [-1] : answer.sort((a, b) => a - b);
}

solution([5, 9, 7, 10], 5);

// filter 메소드 사용

// function solution(arr, divisor) {
// const answer = arr.filter((num)=>{
// return num % divisor === 0
// })
//
// return answer.length === 0 ? [-1] : answer.sort((a,b)=> a-b)
// }
