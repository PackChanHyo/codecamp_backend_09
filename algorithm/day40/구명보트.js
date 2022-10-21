// 나의 풀이 방법

function solution(people, limit) {
  var answer = 0;
  let total = 0;

  for (let i = 0; i < people.length; i++) {
    if (people[i] > limit / 2) {
      answer++;
    } else {
      total += people[i];
    }
  }
  if (total <= limit) {
    answer++;
  }
  return answer;
}

solution([70, 50, 80, 50], 100);
solution([70, 50, 80], 100);

//reduce 풀이법

// function solution(people, limit) {
// people.sort((a,b)=> b - a)
//
// let last = people.length -1
//
// return people.reduce((acc,cur, i)=>{
// if (i <= last){
//    const weight = limit - cur;
// acc++
// if(weight >= people[last]){
// last--;
// }
// }
// return acc;
// },0)
// }
