function solution(s) {
  var answer = true;
  let p = 0;
  let y = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "p" || s[i] === "P") {
      p++;
    } else if (s[i] === "y" || s[i] === "Y") {
      y++;
    }
  }
  answer = p === y;

  return answer;
}

solution(pPoooyY); // Pyy

// function solution(s){
//     // var answer = true;
//     s = s.toLowerCase();
//     const obj= { p : 0, y: 0}
//     // let p = 0;
//     // let y = 0;
//     for(let i = 0; i < s.length; i++){
//         obj[s[i]] === undefined ? obj[s[i]] = 1 : obj[s[i]]++
//         // if(s[i] === "p"){
//         //     p++
//         // } else if(s[i] === "y"){
//         //     y++
//         // }
//     }
//     return obj.p === obj.y
//     // return(p === y)

// }
