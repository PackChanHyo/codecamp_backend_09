const isBonus = ["S", "D", "T"];
const option = ["*", "#"];

function solution(dartResult) {
  let answer = [];
  let score = ""; // 점수를 저장하기 위해 사용하는 변수

  for (let i = 0; i < dartResult.length; i++) {
    if (isNaN(dartResult[i]) === false) {
      // 숫자 타입으로 변환한 데이터가 NaN 값이 아닌경우 (=>숫자인 경우)
      score += dartResult[i];
    } else {
      // 숫자 타입으로 변환한 데이터가 NaN 값인 경우 (=> 숫자가 아닌경우)
      if (isBonus.includes(dartResult[i])) {
        score = Number(score);
        if (dartResult[i] === "D") {
          score = Math.pow(score, 2);
        } else if (dartResult[i] === "T") {
          score = Math.pow(score, 3);
        }
        answer.push(score);
        score = "";
      } else if (option.includes(dartResult[i])) {
        // 옵션이 있는 경우
        if (dartResult[i] === "#") {
          // 아차산인 경우, 해당하는 점수에 -1을 곱해준다.
          answer[answer.length - 1] *= -1;
          // answer.at(-1) *= -1; // error
        } else {
          // 스타상인 경우, 해당하는 점수에 2를 곱해준다.
          // answer.at(-1) *= 2 error
          answer[answer.length - 1] *= 2;

          // 현재 게임이 2번재 게임 이상일 경우에만
          if (answer.length > 1) {
            // 앞에 있는 점수까지 2를 곱해준다.
            // answer.at(-2)
            answer[answer.length - 2] *= 2;
          }
        }
      }
    }
  }
  return answer.reduce((acc, cur) => acc + cur);

  // reduce 메소드 활용하기

  //    const isBonus = ["S", "D", "T"]
  // const option = ["*","#"]

  // function solution(dartResult) {
  //     let score = "";
  //     let currentScore = 0
  //     let last = false
  //     const answer = dartResult.split('').reduce((acc, cur, idx) => {
  //         if(!isNaN(cur)){
  //             score += cur
  //             last = false; // 새로운 턴이 시작됐음을 알려준다.
  //         } else if (isBonus.includes(cur)){
  //             score = Number(score)
  //             const squared = isBonus.indexOf(cur) + 1
  //             currentScore = score ** squared
  //             score = "";
  //             if(!isNaN(dartResult[idx + 1] )|| (idx+ 1) === dartResult.length){
  //                 last = true // 현재 턴이 여기서 종료되었다.
  //             }
  //         }else{
  //             last = true;
  //             if(cur === "*"){
  //                 //스타상이라면
  //                 currentScore *= 2;
  //                 if(acc.length > 0){
  //                     acc[acc.length - 1] *= 2;
  //                 }
  //             }else{
  //                 // 아차상이라면
  //                 currentScore *= -1
  //             }
  //         }
  //         if(last){ // 턴이 종료 되었다면 최종적으로 점수를 저장
  //             acc.push(currentScore)
  //         }
  //         return acc
  //     },[])
  // return answer.reduce((acc,cur)=> acc+ cur)

  // }
}
