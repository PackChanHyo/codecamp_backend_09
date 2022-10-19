function solution(skill, skill_trees) {
  var answer = 0;
  for (let i = 0; i < skill_trees.length; i++) {
    let currentIdx = 0; // 선행스킬 순서를 비교하기위한 변수
    for (let j = 0; j < skill_trees[i].length; j++) {
      const idx = skill.indexOf(skill_trees[i][j]);

      if (idx !== -1) {
        // 선행스킬 순서에 포함되는 스킬이라면,
        if (idx !== currentIdx) {
          // 선행스킬을 먼저 배우지 않은 경우 (불가능한 스킬트리인 경우)
          break;
        }
        currentIdx++;
      }
      if (j === skill_trees[i].length - 1) {
        // 마지막을 체크
        //(중간에 반복이 종료되지 않았다. === 필요한 스킬이 모두 선행된 스킬)
        answer++;
      }
    }
  }
  return answer;
}

// function solution(skill, skill_trees) {
// let answer = 0;
//
// for(let i = 0; i < skill_trees.length; i++){
// let filtered = "";
// for(let j = 0; j < skill_trees[i].length; j++){
// if(skill.includes(skill_trees[i][j])){
// filtered += skill_trees[i][j]
// }
// }
// if(filtered === "") filtered = skill;
// if(skill.includes( filtered )){
// if(skill[0] === filtered[0]){
// answer ++
// }
// }
// }
// return answer
// }

// reduce 풀이법

// function solution(skill, skill_trees) {
// const answer = skill_trees.reduce((acc, cur)=>{
// const filtered = cur.split('').filter((str)=>{
// return skill.includes(str)
// }).join("")
//
// return acc + (
// (skill.includes(filtered) &&
// skill.indexOf(filtered[0]) === 0 )  ||
// filtered === "" ?  1 : 0
// )
// },0)
// return answer
// }
