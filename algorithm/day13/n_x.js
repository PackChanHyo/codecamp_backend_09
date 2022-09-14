//정수 제곱근 판별

function solution(n) {
  let answer = -1;

  for (let i = 1; i * i <= n; i++) {
    if (i * i === n) {
      answer = i + 1;
      return answer * answer;
    }
  }
  return answer;
}

n(121);

//리팩토링

// function solution(n) {
// let answer = -1;
//
// for(let i = 1; i * i <= n;i++){
// if(i * i === n){
// return (i+1)**2
// }
// }
// return answer
// }

// 메소드 사용

// function solution(n) {

//     let sqrt = Math.sqrt(n)
//     if(Number.isInteger(sqrt)){
//        return (sqrt+1) * (sqrt+1)
//        } else{
//            return -1
//        }
// }

// function solution(n) {
//
// let sqrt = Math.sqrt(n)
// if(Number.isInteger(sqrt)){
//    return Math.pow(sqrt+1,2)
//    } else{
//    return -1
//    }
// }
