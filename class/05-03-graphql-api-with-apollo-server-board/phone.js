// export default function qqq(){

// }

export function checkPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("에러 발생!! 핸드폰번호를 제대로 입력해주세요!!");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const qqq = 6;
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
  return result;
  // console.log(result);
}

export function sendTokenToSMS(myphone, result) {
  console.log(myphone + "번호로 인증번호" + result + "를 전송합니다.");
}
