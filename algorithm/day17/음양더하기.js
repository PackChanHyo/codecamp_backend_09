function solution(absolutes, signs) {
  let answer = 0;
  for (let i = 0; i < absolutes.length; i++) {
    if (signs[i]) {
      answer += absolutes[i];
    } else {
      answer += -absolutes[i];
    }
  }
  return answer;
}

// function solution(absolutes, signs) {
//     let answer = 0;
//     for(let i = 0; i < absolutes.length; i++){
//         answer+=signs[i] ? absolutes[i] : -absolutes[i]
//     }
//     return answer;
// }

// reduce 메소드
// function solution(absolutes, signs) {
// const answer = absolutes.reduce((acc,cur, i) => {
//  return acc + (signs[i] ? cur : -cur)
// },0)
// return answer
// }
