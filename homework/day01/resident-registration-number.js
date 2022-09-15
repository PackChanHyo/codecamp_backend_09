// 하이픈 - 구성이 되어있는지 확인
function HyHen(fullNum) {
  if (fullNum.includes("-") === false) {
    console.log("에러 발생!! 형식이 올바르지 않습니다!!");
    return false;
  } else {
    return true;
  }
}

// 갯수 구성
function arrNum(fullNum) {
  let fullNumber = fullNum.split("-");
  let firstNum = fullNumber[0];
  let lastNum = fullNumber[1];

  if (firstNum.length > 6) {
    console.log("에러 발생!! 개수를 제대로 입력해주세요!!");
  }
  if (lastNum.length > 7) {
    console.log("에러 발생!! 개수를 제대로 입력해주세요!!");
  }
}

// 마스킹
function Masking(fullNum) {
  fullNumbers = fullNum.split("");
  let masking = fullNumbers.fill("*", 8).join("");
  console.log(masking);
  return;
}

function customRegistrationNumber(fullNum) {
  const HypHen = HyHen(fullNum);
  if (HypHen === false) return;
  arrNum(fullNum);

  Masking(fullNum);
}

customRegistrationNumber("210510-1010101");
