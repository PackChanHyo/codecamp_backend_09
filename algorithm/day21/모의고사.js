const answerTable = [
  // 1번 수포자가 찍는 방식
  [1, 2, 3, 4, 5], // 5개의 패턴
  // 2번 수포자가 찍는 방식
  [2, 1, 2, 3, 2, 4, 2, 5], //8개의 패턴
  // 3번 수포자가 찍는 방식
  [3, 3, 1, 1, 2, 2, 4, 4, 5, 5], // 10개의 패턴
];

function solution(answers) {
  const score = [0, 0, 0]; // 수포자의 점수를 저장하는 배열

  for (let i = 0; i < answers.length; i++) {
    for (let j = 0; j < answerTable.length; j++) {
      if (answers[i] === answerTable[j][i % answerTable[j].length]) {
        score[j]++;
      }
    }
  }
  // 제일 많이 맞춘 수포자의 점수를 구한다,
  const biggest = Math.max(...score);

  const answer = [];
  for (let i = 0; i < score.length; i++) {
    if (biggest === score[i]) {
      answer.push(i + 1);
    }
  }
  return answer;
}

// 메소드 활용 레퍼런스 코드

// const answerTable = [
// 1번 수포자가 찍는 방식
// [1,2,3,4,5], // 5개의 패턴
// 2번 수포자가 찍는 방식
// [2,1,2,3,2,4,2,5], //8개의 패턴
// 3번 수포자가 찍는 방식
// [3,3,1,1,2,2,4,4,5,5] // 10개의 패턴
// ]
//
// function solution(answers) {
// const scoreList = answerTable.map((el, i)=>{
// const score = answers.reduce((acc, cur,j) => {
//    return acc +(el[j % el.length] === cur ? 1 : 0)
// },0)
// return {student : i + 1, score}
// })
// const biggest = Math.max(...scoreList.map((el)=>{
// return el.score
// }))
// return scoreList.filter((el)=> {
// return biggest === el.score
// }).map((el)=>{
// return el.student
// })
// }
