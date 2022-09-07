function solution(s) {
  let reuslt = s
    .split("")
    .sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
    })
    .join("");
  return reuslt;
}

let s = "Zbcdefg";

// function solution(s) {
//     let reuslt = [];

//     for (let i = 0; i < s.length; i++){
//         reuslt.push(s[i])
//     }
//     reuslt.sort((a,b)=>{
//         return a > b ? -1 : 1
//     })
//     let answer = "";
//     for(let i = 0; i < reuslt.length; i++){
//         answer +=reuslt[i]
//     }
//     return answer
// }

// function solution(s) {
// const arr = s.split('')
// arr.sort((a,b) => {
// return a > b ? -1 : 1
// })
// const answer = arr.join("")
// return answer
//
//
// }
