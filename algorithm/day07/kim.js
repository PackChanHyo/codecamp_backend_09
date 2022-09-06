// 서울에서 김서방 찾기

function solution(seoul) {
  let str = seoul.indexOf("Kim");
  let answer = "김서방은 " + str + "에 있다";
  return answer;
}

// 수업 풀이

// function solution(seoul) {
//     let x = 0; // 김서방의 위치 (인덱스)를 저장
//     for(let i = 0; i < seoul.length; i++){
//         if(seoul[i] === "Kim"){
//            x = i
//            }
//     }
//     return `김서방은 ${x}에 있다`
// }

// function solution(seoul) {
// const x = seoul.indexOf("Kim")
// return `김서방은 ${x}에 있다`
// }
