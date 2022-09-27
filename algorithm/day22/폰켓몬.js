function solution(nums) {
  const answer = [];

  for (let i = 0; i < nums.length; i++) {
    if (!answer.includes(nums[i]) && nums.length / 2 !== answer.length) {
      answer.push(nums[i]);
    }
  }
  return answer.length;
}

// new Set() 객체 사용하기

// function solution(nums) {
// const answer = new Set([])
//
// for(let i = 0; i < nums.length; i++){
// if( (nums.length/2)!== answer.size){
//    answer.add(nums[i])
// }
// }
// return answer.size
// }

// ForEach 메소드 사용하기

// function solution(nums) {
// const answer = []
// nums.forEach((monster)=> {
// if(!answer.includes(monster) && (nums.length / 2) !== answer.length){
//    answer.push(monster)
//    }
// })
// return answer.length
// }

// new Set 다른 버전

// function solution(nums) {
// const answer = new Set(nums).size
// const limit = nums.length / 2 // 최대한 넣을 수 있는 폰켓몬의 종류
//
// if(limit >= answer) {
// return answer;
// }
// return limit
// }
