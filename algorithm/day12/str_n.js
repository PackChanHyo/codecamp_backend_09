function solution(n) {
  let str = n
    .toString()
    .split("")
    .reverse()
    .map((x) => parseInt(x));
  return str;
}

solution(12345);

//for문

// function solution(n) {
// const answer= []
//  n = String(n)
// for(let i = n.length - 1; i >= 0; i--){
// answer.push(Number(n[i]))
// }
// return answer
// }
