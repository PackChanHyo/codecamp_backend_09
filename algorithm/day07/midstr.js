// 가운데 문자 가져오기

function solution(s) {
  let answer = "";
  if (s.length % 2 === 0) {
    answer = s[s.length / 2 - 1] + s[s.length / 2];
  } else {
    answer = s[Math.floor(s.length / 2)];
  }
  return answer;
}

// 수업 풀이

// function solution(s){
//     let center = Math.floor(s.length / 2)
//     let answer = s[center]

//     if(s.length % 2 === 0){
//         //짝수일 경우 가운데 2글자를 가져온다.
//         answer = s[center - 1] + answer
//     }
//     return answer
//   }

// 삼항 연산자

// function solution(s){
//     let center = Math.floor(s.length / 2)
//     let answer = s.length % 2 === 0 ? s.slice(center - 1,center + 1) : s[center]
//     return answer
//   }
