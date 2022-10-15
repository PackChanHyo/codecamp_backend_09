function solution(id_list, report, k) {
  const reporter = {};
  const users = {};

  report = Array.from(new Set(report));
  console.log(report);

  const answer = [];

  for (let i = 0; i < report.length; i++) {
    const info = report[i].split(" ");

    if (reporter[info[0]] === undefined) reporter[info[0]] = [];
    if (users[info[1]] === undefined) users[info[1]] = 0;
    //중복 신고를 방지
    // 지금 신고하려는 유저가 이전에 해당 유저를 신고한 내역이 있는지를 검증
    // if(reporter[ info[0] ].includes(info[1]) === false){
    reporter[info[0]].push(info[1]);
    users[info[1]]++;
    //}
  }
  for (let i = 0; i < id_list.length; i++) {
    const arr = reporter[id_list[i]] || [];
    answer[i] = 0;

    for (let j = 0; j < arr.length; j++) {
      if (users[arr[j]] >= k) {
        answer[i]++;
      }
      // console.log(id_list[i],arr[j],users [arr[j] ],k,answer )
    }
  }
  return answer;
}
// 메소드 활용하기
// function solution(id_list, report, k) {
// const reporter = {}
// const users = {}
//
// report = Array.from(new Set(report))
//
// report.forEach((el)=>{
// el = el.split(" ");
//
// if(reporter[ el[0]] === undefined)
// reporter[el[0]] = []
// if(users[ el[1] ] ===undefined)
// users[el[1]] = 0;
//
// reporter[el[0]].push(el[1])
// users[ el[1] ]++;
// })
// return id_list.map(name => {
// const arr = reporter[name] || []
// return arr.reduce((acc,cur)=> {
//
// return acc + (users[cur] >= k ? 1:0)
//
// },0)
// } )
// }
