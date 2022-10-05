function solution(board, moves) {
  let answer = 0;
  const bucket = []; // 뽑은 인형들이 담겨지는 배열

  // 1. 크레인이 이동하는 위치값을 구하는 반복문
  for (let i = 0; i < moves.length; i++) {
    for (let j = 0; j < board.length; j++) {
      // console.log(moves[i],board[j])
      const doll = board[j][moves[i] - 1];

      // 3, 크레인이 이동하는 위치가 빈칸이 아니라면
      if (doll !== 0) {
        console.log(moves[i], board[j]);
        // 4. 뽑은 인형의 위치를 빈칸으로 만들어 준다.
        board[j][moves[i] - 1] = 0;

        // 바구니에 인형을 넣으려고 할 때,
        if (bucket[bucket.length - 1] === doll) {
          bucket.pop();
          answer += 2;
          break;
        }
        // 바구니의 맨 위에 있는 인형이 현재 넣으려는 인형과 같다면, 바구니 맨 위의 인형을 제거

        // 5. 바구니에 뽑은 인형을 담아준다.
        bucket.push(doll);
        // 한번 인형을 뽑았다면,같은 위치에 대한 크레인의 동작을 종료
        break;
      }
    }
  }
  return answer;
}

solution(
  [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [4, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ],
  [1, 5, 3, 5, 1, 2, 1, 4]
);

// function solution(board, moves) {
// let answer = 0;
// const bucket = []; // 뽑은 인형들이 담겨지는 배열
//
// moves.forEach((move) => {
// 반복문을 정지된 것처럼 보이게 해줄 변수
// false일 때만, 내부의 로직이 동작하도록
// let pick = false;
// board.forEach((location) => {
// const doll = location[move - 1];
// if(pick === false) {
// if(doll !== 0) {
// location[move - 1] = 0;
// if(bucket[bucket.length - 1] === doll) {
// answer += 2
// bucket.pop()
// } else {
// bucket.push(doll)
// }
// pick = true
// }
// }
// })
// })
//
// return answer
// }
