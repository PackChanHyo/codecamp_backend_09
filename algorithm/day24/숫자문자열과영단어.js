let numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function solution(s) {
  for (let i = 0; i < numbers.length; i++) {
    while (s.includes(numbers[i])) {
      s = s.replace(numbers[i], i);
    }
  }
  return Number(s);
}

// replaceAll 메소드 사용하기

// let numbers = ["zero","one","two","three","four","five","six","seven",'eight',"nine"]
//
// function solution(s) {
// for(let i = 0; i < numbers.length; i++){
// s = s.replaceAll(numbers[i],i)
// }
// return Number(s)
// }

// forEach,split,join 메소드 사용하기

// let numbers = ["zero","one","two","three","four","five","six","seven",'eight',"nine"]
//
// function solution(s) {
//  numbers.forEach((el,i) => {
//  s = s.split(el).join(i)
//  })
// return Number(s)
// }

//  정규 표현식 사용하기

// let numbers = [
// "zero",
// "one",
// "two",
// "three",
// "four",
// "five",
// "six",
// "seven",
// "eight",
// "nine",
//   ];
//
//   function solution(s) {
//    표현식 사용법: 슬래시를 열고 닫아준다.
//    슬래시 안쪽에 검증할 문자열
//    g : 문자열 전체에서 검색
//   for( let i = 0; i < numbers.length; i++){
//   const regExp = new RegExp(numbers[i],'g')
//   s = s.replace(regExp,i)
//   }
//   return Number(s)
//   }
