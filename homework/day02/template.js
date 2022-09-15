function masking(fullNum) {
  fullNumbers = fullNum.split("");
  let masking = fullNumbers.fill("*", 8).join("");
  return masking;
}
function getWelcomeTemplate({ email, fullNum, phone, favoriteSite }) {
  const template = `<html>
    <body>
    <h1> 코드캠프님 가입을 환영합니다.<h1>
    <div>이메일 : ${email}</div>
    <div>주민번호 : ${fullNum} </div>
    <div>휴대폰 번호: ${phone}</div>
    <div>내가 좋아하는 사이트: ${favoriteSite} </div>
    </body>
    </html>`;

  console.log(template);
}
function getTemplate({ email, fullNum, phone, favoriteSite }) {
  const myTemplate = getWelcomeTemplate({
    email,
    fullNum,
    phone,
    favoriteSite,
  });
}

const email = "support@codebootcamp.co.kr";
const fullNum = masking("210510-1010101");
const phone = "000-0000-0000";
const favoriteSite = "codebootcamp.co.kr";
getTemplate({ email, fullNum, phone, favoriteSite });
