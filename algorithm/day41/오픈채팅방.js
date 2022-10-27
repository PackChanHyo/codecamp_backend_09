function solution(record) {
  const answer = [];

  const users = {}; // 유저들의 최종 닉네임 값을 저장
  for (let i = 0; i < record.length; i++) {
    const infos = record[i].split(" ");

    if (infos[2]) {
      users[infos[1]] = infos[2];
    }

    if (infos[0] !== "Change") {
      // Enter, Leave 둘 중 하나라면
      answer.push({
        action: infos[0],
        uid: infos[1],
      });
    }
  }

  for (let idx in answer) {
    answer[idx] =
      users[answer[idx].uid] +
      (answer[idx].action === "Enter"
        ? "님이 들어왔습니다."
        : "님이 나갔습니다.");
  }
  return answer;
}
// reduce 방법
// function solution(record) {
//   record = record.map((el) => el.split(" "));
//   const users = record.reduce((acc, cur) => {
// if (cur[2]) {
//   acc[cur[1]] = cur[2];
// }
// return acc;
//   }, {});
//
//   const answer = record.reduce((acc, cur) => {
// if (cur[0] !== "Change") {
//   acc.push(
// `${users[cur[1]]}님이 ` +
//   (cur[0] === "Enter" ? "들어왔습니다." : "나갔습니다.")
//   );
// }
// return acc;
//   }, []);
//   return answer;
// }
