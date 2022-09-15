function solution(num) {
  let answer = 0;
  for (let i = 0; i < 500; i++) {
    if (num === 1) {
      break;
    }
    answer++;
    if (num % 2 === 0) {
      num = num / 2;
    } else {
      num = num * 3 + 1;
    }
  }
  return num !== 1 ? -1 : answer;
}

solution(6);

// forEach문
// function solution(num) {
//     let answer = 0;
//     const result = new Array (500).fill(1).forEach((el) => {
//         if(num !== 1){
//             answer++
//             num = num % 2 === 0 ? num/2 : (num*3)+1
//         }

//     })
//     return num !== 1 ? -1 : answer
// }
