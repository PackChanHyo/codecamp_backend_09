function solution(n) {
  // let str = String(n).split("").reduce((acc,cur)=>
  //    acc += Number(cur),0)
  let str = n
    .toString()
    .split("")
    .map((e) => parseInt(e));
  return str.reduce((acc, cur) => acc + cur, 0);
}

let N = 123;

// function solution(n){
// let answer = 0;
//   n = String(n)
//   for(let i = 0; i< n.length; i++){
//   answer += Number(n[i])
//   }
//   return answer
//   }
