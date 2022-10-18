function solution(progresses, speeds) {
  const answer = [];
  let day = 0;

  for (let i = 0; i < progresses.length; i++) {
    // 100% 완성까지 며칠이 걸리는지
    const process = Math.ceil((100 - progresses[i]) / speeds[i]);

    if (process > day) {
      day = process;
      answer[answer.length] = 1;
    } else if (day >= process) {
      // 개발이 완료됐지만 앞에 있는 기능이 개발될 때까지 기다리는 경우
      answer[answer.length - 1]++;
    }
  }
  return answer;
}

/// map , reduce
// function solution(progresses, speeds) {
// let day = 0;
// const answer = progresses.map( (el, i) => {
// const process = Math.ceil( (100 - el) / speeds[i] );
//
// if( process > day ) day = process;
// return day;
//
// }).reduce( (acc, cur, i, array) => {
// if( cur !== array[i - 1] ) {
// acc[ acc.length ] = 1;
//
// } else {
// acc[ acc.length - 1 ]++;
// }
// return acc;
// }, [])
//
// return answer;
// }

// reduce 방법

// function solution(progresses, speeds) {
// let day = 0;
// const answer = progresses.reduce( (acc, cur, i) => {
// const process = Math.ceil( (100 - cur) / speeds[i] );
//
// if( process > day ) {
// day = process;
// acc[ acc.length ] = 1;
//
// } else if( process <= day ) {
// acc[ acc.length - 1 ]++;
// }
// return acc;
// }, [])
//
// return answer;
// }
