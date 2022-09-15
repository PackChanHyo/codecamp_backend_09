import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import axios from "axios";
import cheerio from "cheerio";

export function checkEmail(myemail) {
  if (myemail === undefined || myemail.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export async function createMessage(prefer) {
  //입력된 메시지 : "안녕하세요 ~ https://www.naver.com 에 방문해주세요!"
  const openGraph = {
    title: "",
    description: "",
    image: "",
    url: "",
  };

  // 1. 입력된 메시지에서 http로 시작하는 문장이 있는지 먼저 찾기!(.find() 등의 알고리즘 사용하기)
  const url = prefer;

  // 2. axios.get으로 요청해서 html 코드 받아오기 => 스크래핑 (cheerio다운,import하기)
  const result = await axios.get(url);
  // console.log(result.data);

  // 3. 스크래핑 결과에서 OG(오픈그래프) 코드 골라내서 변수에 저장하기
  const $ = cheerio.load(result.data);
  $("meta").each((_, el) => {
    if (!$(el).attr("property")) return;

    const key = $(el).attr("property").split(":")[1];
    const content = $(el).attr("content");
    openGraph[key] = content;
  });
  return openGraph;
}

export function MaskingNum(mypersonal) {
  const personal01 = mypersonal.split("-");
  const personal02 = personal01[1].split("").fill("*").join("");
  const personalNum = personal01[0] + "-" + personal02;
  return personalNum;
}

export function getWelcomeTemplate({ name, phoneNum, prefer }) {
  // const {age, createdAt} = { name, age, school, createdAt }

  const mytemplate = `
          <html>
              <body>
                  <div style="display : flex; flex-direction: column; align-items:center;">
                    <div style="width: 500px;">
                      <h1>${name}님 가입을 환영합니다!!!</h1>
                      <hr />
                      <div>이름: ${name}</div>
                      <div>핸드폰 번호: ${phoneNum}</div>
                      <div>좋아하는 사이트: ${prefer}</div>
                      <div>가입일: ${getToday()}</div>
                    </div>
                  <div>
              </body>
          </html>
      `;
  return mytemplate;
  // console.log(mytemplate)
}

export async function sendTemplateToEmail(myemail, result) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const response = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: myemail,
    subject: "[코드캠프] 가입을 축하합니다.",
    html: result,
  });
  console.log(response);

  // console.log(myemail + "이메일로 가입환영템플릿 " + result + "를 전송합니다!!!");
}
