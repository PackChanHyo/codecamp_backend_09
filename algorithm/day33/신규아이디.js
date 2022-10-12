const permission = "qwertyuiopasdfghjklzxcvbnm1234567890-_.";

function solution(new_id) {
  // 1단계 : 대문자를 소문자로 치환
  new_id = new_id.toLowerCase();

  // 2단계 : 소문자, 숫자, 빼기, 밑줄, 마침료를 제외한 모든 문자를 제거
  let answer = "";
  for (let i = 0; i < new_id.length; i++) {
    if (permission.includes(new_id[i])) {
      answer += new_id[i];
    }
  }

  // 3단계 : 마침표가 두번 이상 연속되는 경우, 하나의 마침표로 치환
  while (answer.includes("..")) {
    answer = answer.replace("..", ".");
  }

  // 4단계 : 마침표가 처음이나 끝에 위치한다면 제거
  if (answer[0] === ".") {
    answer = answer.substring(1);
  }

  const removeDot = function () {
    // if( answer.at( -1 ) === "." ) {
    if (answer[answer.length - 1] === ".") {
      answer = answer.substring(0, answer.length - 1);
    }
  };
  removeDot();

  // 5단계 : 빈 문자열이라면, "a"를 대입
  if (answer.length === 0) {
    // if( answer === "" )
    answer = "a";
  }

  // 6단계 : 길이가 16 이상이라면, 15의 길이를 만들어주고,
  //        문자열의 마지막에 마침표가 있다면, 다시 제거
  if (answer.length >= 16) {
    answer = answer.substring(0, 15);
    removeDot();
  }

  // 7단계 : 문자열의 길이가 2 이하라면, 길이가 3이 될 때까지 마지막 글자를 반복해서 추가
  if (answer.length <= 2) {
    answer = answer.padEnd(3, answer[answer.length - 1]);
  }

  return answer;
}

// 배열로 풀어보기

// const permission = "qwertyuiopasdfghjklzxcvbnm1234567890-_.";
//
// function solution(new_id) {
// 1단계 : 대문자를 소문자로 치환
// new_id = new_id.toLowerCase().split('')
//
// 2단계 : 소문자, 숫자, 빼기, 밑줄, 마침료를 제외한 모든 문자를 제거
// let answer = new_id.filter((str) => permission.includes( str ))
//
// 3단계 : 마침표가 두번 이상 연속되는 경우, 하나의 마침표로 치환
// answer = answer.filter((str, i) => {
// return str !== "." || (str === "." && answer[i + 1] !== ".")
// })
//
// 4단계 : 마침표가 처음이나 끝에 위치한다면 제거
// if( answer[0] === "." ) {
// answer.splice( 0, 1 )
// }
//
// const removeDot = function() {
// if( answer[ answer.length - 1 ] === "." ) {
// answer.splice( answer.length - 1, 1 )
// }
// }
// removeDot()
//
// 5단계 : 빈 문자열이라면, "a"를 대입
// if( answer.length === 0 ) { // if( answer === [] )
// answer = ["a"]
// }
//
// 6단계 : 길이가 16 이상이라면, 15의 길이를 만들어주고,
//    문자열의 마지막에 마침표가 있다면, 다시 제거
// if( answer.length >= 16 ) {
// answer.splice( 15 )
// removeDot()
// }
//
// 7단계 : 문자열의 길이가 2 이하라면, 길이가 3이 될 때까지 마지막 글자를 반복해서 추가
// if( answer.length <= 2 ) {
// const add = new Array( 3 - answer.length )
// .fill( answer[ answer.length - 1 ] )
// answer = answer.concat(add) // answer = [...answer, ...add]
// }
//
// return answer.join('')
// }
