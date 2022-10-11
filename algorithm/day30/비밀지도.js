// 내풀이

// function solution(n, arr1, arr2) {
//   let answer = []
//   let result = []
//   for(let i = 0; i < n; i++){
//     str = (arr1[i] | arr2[i]).toString(2)
//     answer.push(str.split(''))
//   }
//   for( let i = 0 ; i < n; i++){
//     for(let j = 0; j < answer[i].length; j++){
//       if(answer[i][j] === "1"){
//         answer[i][j] = '#'
//       }else{
//         answer[i][j] = ' '
//       }
//     }
//     // console.log(result)
//     result.push(answer[i].join(''))
//   }
//   console.log(result)
//   }

// 레퍼런스 코드
function solution(n, arr1, arr2) {
  let answer = [];

  for (let i = 0; i < arr1.length; i++) {
    answer[i] = "";
    const map1 = arr1[i].toString(2).padStart(n, "0");
    const map2 = arr2[i].toString(2).padStart(n, "0");

    for (let j = 0; j < map1.length; j++) {
      if (map1[j] === "1" || map2[j] === "1") {
        answer[i] += "#";
      } else {
        answer[i] += " ";
      }
    }
  }
  return answer;
}

//   매개변수	값
// n	5
// arr1	[9, 20, 28, 18, 11]
// arr2	[30, 1, 21, 17, 28]
// 출력	["#####","# # #", "### #", "# ##", "#####"]

// 메소드 활용하여 풀기

// function solution(n, arr1, arr2) {
// const answer = arr1.map((map1,i)=>{
// map1 = map1.toString(2).padStart(n,'0')
//   map2 = arr2[i].toString(2).padStart(n,'0')
//   return map1.split('').reduce((acc,cur , j)=>{
//  return   acc + (cur === '1' || map2[j] ==='1' ? '#' : " ")
//   },'')
// })
// return answer
//   }
