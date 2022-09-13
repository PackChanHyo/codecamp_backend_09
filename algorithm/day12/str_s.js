function solution(s) {
  let answer = [];
  let result = s.split(" ");
  for (let i = 0; i < result.length; i++) {
    let str = "";
    for (let j = 0; j < result[i].length; j++) {
      if (j % 2 === 0) {
        str += result[i][j].toUpperCase();
      } else {
        str += result[i][j].toLowerCase();
      }
    }
    answer.push(str);
  }
  return answer.join(" ");
}

solution("try hello world");

// function solution(s) {
// let answer = ""
// let idx = 0;
//
// for(let i = 0; i < s.length; i++){
// if(s[i] === " "){
// answer += " "
// idx= 0;
// } else {
// answer += idx % 2 === 0 ? s[i].toUpperCase() : s[i].toLowerCase()
// idx++
// }
// }
// return answer
// }

//map 메소드 사용

// function solution(s) {
// let answer = s.split(' ').map(word =>{
// return word.split('').map((letter,i) => {
// return i % 2 === 0 ? letter.toUpperCase() :letter.toLowerCase()
// }).join('')
// }).join(" ")
// return answer
// }
