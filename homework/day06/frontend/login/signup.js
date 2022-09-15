// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  const phone1 = document.getElementById("PhoneNumber01").value;
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;
  const phoneNum = phone1 + phone2 + phone3;
  console.log(phoneNum);

  await axios
    .post("http://localhost:3100/tokens/phone", {
      phoneNum,
    })
    .then(function (response) {
      return response;
    });

  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");
};

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log("회원 가입 이메일 전송");
  const name = document.getElementById("SignupName").value;
  const personal = document.getElementById("SignupPersonal").value;
  const phone1 = document.getElementById("PhoneNumber01").value;
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;
  const phoneNum = phone1 + phone2 + phone3;
  const prefer = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const pass = document.getElementById("SignupPwd").value;

  await axios
    .post("http://localhost:3100/users", {
      name,
      personal,
      phoneNum,
      prefer,
      email,
      pass,
    })
    .then(function (response) {
      return response;
    });
};
