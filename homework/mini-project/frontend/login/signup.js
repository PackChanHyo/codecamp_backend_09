// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");
  const phone01 = document.getElementById("PhoneNumber01").value;
  const phone02 = document.getElementById("PhoneNumber02").value;
  const phone03 = document.getElementById("PhoneNumber03").value;

  const phone = phone01 + phone02 + phone03;

  await axios
    .post("http://localhost:3000/tokens/phone", {
      phone,
    })
    .then(function (response) {
      return response;
    });
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const phone01 = document.getElementById("PhoneNumber01").value;
  const phone02 = document.getElementById("PhoneNumber02").value;
  const phone03 = document.getElementById("PhoneNumber03").value;

  const myphone = phone01 + phone02 + phone03;
  const mytoken = document.getElementById("TokenInput").value;

  await axios
    .patch("http://localhost:3000/tokens/phone", {
      myphone,
      mytoken,
    })
    .then(function (response) {
      return response;
    });
  console.log("인증완료");
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById("SignupName").value;
  const personal01 = document.getElementById("SignupPersonal1").value;
  const personal02 = document.getElementById("SignupPersonal2").value;
  const personal = personal01 + "-" + personal02;
  const phone1 = document.getElementById("PhoneNumber01").value;
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;
  const phone = phone1 + phone2 + phone3;
  const prefer = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const pwd = document.getElementById("SignupPwd").value;

  await axios
    .post("http://localhost:3000/users", {
      name,
      email,
      personal,
      prefer,
      pwd,
      phone,
    })
    .then(function (response) {
      return response;
    });

  console.log("회원 가입 이메일 전송");
};
