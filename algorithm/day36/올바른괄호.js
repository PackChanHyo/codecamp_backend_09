function solution(s) {
  const limit = s.length / 2;
  for (let i = 0; i < limit; i++) {
    s = s.replace("()", "");
  }
  return s === "";
}

// for문 풀이법

// function solution(s) {
// 첫 문자열이 닫혀있거나, 마지막이 열려있다면 false 를 리턴한다. (예외처리)
// if( s[0] === ")" || s[s.length - 1] === "(" ) return false;
//
// let depth = 1;
// for( let i = 1; i < s.length; i++ ) {
// if( s[i] === "(" ) {
// 열려있다면 1을 더한다.
// depth++;
//
// } else if( s[i] === ")" ) {
// 닫혀있다면 1을 뺀다.
// depth--;
//
// 0 미만으로 (닫혀있는 게 더 많다면 먼저 false를 리턴한다.)
// if( depth < 0 ) {
// return false;
// }
// }
// }
// return depth === 0
// }

// reduce 풀이법

// function solution(s) {
// 첫 문자열이 닫혀있거나, 마지막이 열려있다면 false 를 리턴한다. (예외처리)
// if( s[0] === ")" || s[s.length - 1] === "(" ) return false;
//
// let fail = false;
// const answer = s.split("")
// .reduce( (acc, cur) => {
// if( acc < 0 ) {
// fail = true;
// }
// return acc + ( cur === "(" ? 1 : -1 )
// }, 0)
// return answer === 0 && fail === false;
// }
