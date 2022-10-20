function solution(n, words) {
  for (let i = 1; i < words.length; i++) {
    const player = (i % n) + 1;
    const turn = Math.floor(i / n + 1);

    const preWord = words[i - 1][words[i - 1].length - 1]; // 이전사람이 말한 단어의 가장 뒷부분(마지막 글자)
    const nowWord = words[i][0]; // 현재 사람이 말한 단어의 가장 앞부분(첫 글자)

    if (preWord !== nowWord || words.indexOf(words[i]) !== i) {
      return [player, turn];
    }
  }
  return [0, 0];
}

// reduce 메소드 활용

// function solution(n, words) {
// let stop = false
// return words.slice(1).reduce((acc,cur,i)=>{
// const preWord = words[i]
// i++
// const player = (i % n) + 1
// const turn = Math.floor(i / n ) + 1
// if(stop === false){
// if(preWord[preWord.length - 1] !== cur[0] ||
// words.indexOf(cur) !== i
//   ){
// stop= true
// return [player,turn]
// }
// }
//
// return acc
// },[0,0])
//
// }
