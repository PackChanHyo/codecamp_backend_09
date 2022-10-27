function solution(msg) {
  const dictionary = {};

  let index = 1;
  for (let i = 65; i <= 90; i++) {
    dictionary[String.fromCharCode(i)] = index;
    index++;
  }

  const answer = [];
  let str = "";

  for (let i = 0; i < msg.length; i++) {
    str += msg[i];
    const next = str + msg[i + 1];

    if (dictionary[next] === undefined) {
      // 만약 바로 뒤의 한글자까지 포함한 문자가 색인 번호가 없다면,
      dictionary[next] = index;
      if (msg[i + 1] !== undefined) {
        dictionary[next] = index;
      }
      index++;
      answer.push(dictionary[str]);
      str = "";
    }
  }

  return answer;
}

// reduce 메소드

// function solution(msg) {
// const dictionary = {}
//
// let index = 1;
// for(let i = 65; i <=90; i++){
// dictionary[String.fromCharCode(i)] = index;
// index++
// }
// let str = ''
// return msg.split("").reduce((acc,cur,i)=>{
// str += cur;
// const next = str + msg[i + 1]
// if(!dictionary[next]){
// if(msg[i + 1])dictionary[next] = index;
// index++
// acc.push(dictionary[str])
// str = ""
// }
// return acc
// },[])
// }
