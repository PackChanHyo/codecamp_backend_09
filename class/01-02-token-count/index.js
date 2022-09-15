// console.log("안녕하세요!!");

// 토큰 생성하기

//리팩토링 패턴 ->early exit
function getToken(qqq) {
  if (qqq === undefined) {
    console.log("에러 발생!! 갯수를 제대로 입력해 주세요!!");
    return;
  }
  if (qqq < 2) {
    console.log("에러 발생 !! 갯수가 너무 작습니다!");
    return;
  }
  if (qqq >= 10) {
    console.log("에러 발생 !! 갯수가 너무 많습니다!!");
    return;
  }
  const result = String(Math.floor(Math.random() * 10 ** qqq)).padStart(
    qqq,
    "0"
  );
  console.log(result);

  // 실무에서 사용하지 않는 코드
  //   if (qqq !== undefined) {
  //     if (qqq > 2) {
  //       if (qqq < 10) {
  //       } else {
  //       }
  //     } else {
  //     }
  //   } else {
  //   }
}

getToken();
