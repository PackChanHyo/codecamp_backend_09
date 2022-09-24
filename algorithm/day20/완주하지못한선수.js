// 정확성 테스트 통과 / 효율성 테스트 실패
for (let i = 0; i < completion.length; i++) {
  if (participant.includes(completion[i])) {
    participant.splice(participant.indexOf(completion[i]), 1);
  }
}
return participant[0];

// break 사용해서 푸는 방법
// function solution(participant, completion) {
// participant.sort((a,b)=> a > b ? 1: -1)
// completion.sort((a,b)=> a > b ? 1 : -1)
//
// let answer = ''
// for( let i = 0; i <participant.length; i++){
// if(participant[i] !== completion[i]){
// answer = participant[i]  // break 말고 바로 return을 사용해도 된다.
//    break;
// }
// }
// return answer
// }

// filter 메소드
// function solution(participant, completion) {
// participant.sort((a,b)=> a > b ? 1: -1)
// completion.sort((a,b)=> a > b ? 1 : -1)
//
// const answer = participant.filter((name, i)=>{
// return name !== completion[i]
// })
// return answer[0]
// }
