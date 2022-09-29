function solution(nums) {
  let answer = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        const sum = nums[i] + nums[j] + nums[k];

        let count = 0;
        for (let o = 1; o <= sum; o++) {
          if (sum % o === 0) {
            count++;
            if (count > 2) {
              break;
            }
          }
        }
        if (count === 2) {
          answer++;
        }
      }
    }
  }
  return answer;
}

// function solution(nums) {
// let answer = 0;
// let index = 0;
//
// 첫번째 i 가 0 이라면
// nums.forEach( (num1, i) => {
// index = i + 1; // i 가 1 부터
// nums.slice( index ).forEach( num2 => {
// index += 1; // i 가 2 부터
// nums.slice( index ).forEach( num3 => {
// const sum = num1 + num2 + num3;
//
// let count = 0;
// if( sum % 2 === 1 ) {
// 홀수일 때만
// for( let o = 1; o <= sum; o++ ) {
// if( sum % o === 0 ) {
// count++;
//
// if( count > 2 ) {
// break;
// }
// }
// }
// if( count === 2 ) {
// answer++;
// }
// }
// })
// })
// })
// return answer;
// }
