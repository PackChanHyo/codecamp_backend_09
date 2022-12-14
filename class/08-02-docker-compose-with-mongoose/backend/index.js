// const express = require("express");
import express from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors"; //임시로 cors  허용
import mongoose from "mongoose";
import { Board } from "./models/board.model.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get("/boards", async function (req, res) {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  // const result = [
  //   {
  //     number: 1,
  //     writer: "철수",
  //     title: "제목입니다.",
  //     contents: "내용이에요!",
  //   },
  //   {
  //     number: 2,
  //     writer: "영희",
  //     title: "영희입니다요~",
  //     contents: "영희에유!",
  //   },
  //   {
  //     number: 3,
  //     writer: "훈이",
  //     title: "안녕하세요.",
  //     contents: "훈이입니다.!",
  //   },
  // ];
  const result = await Board.find();

  // 2 . DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
  res.send(result);
});

app.post("/boards", async function (req, res) {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req.body);

  // 2. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents,
  });
  await board.save();
  // 3. DB에 저장이 잘 됐으면, 결과를 브라우저에 응답(response) 주기
  res.send("게시물 등록에 성공하였습니다.").status(210); // 상태코드 같이 보내기, 따로 안쓰게 되면 200으로 보내짐
});

app.post("/tokens/phone", (req, res) => {
  const myphone = req.body.myphone;
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkPhone(myphone);
  if (isValid === false) return;

  // 2. 핸드폰 토큰 6자리 만들기
  const mytoken = getToken();

  // 3. 핸드폰번호에 토큰 전송하기
  sendTokenToSMS(myphone, mytoken);
  res.send("인증완료!!!");
});

app.post("/users", (req, res) => {
  // const name = req.body.name
  // const age = req.body.age
  // const school = req.body.school
  // const email = req.body.email
  const { name, age, school, email } = req.body;
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email);
  if (isValid === false) return;

  // 2. 가입환영 템플릿 만들기
  const mytemplate = getWelcomeTemplate({ name, age, school });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, mytemplate);
  res.send("가입완료");
});

// 몽고DB 접속 !!
mongoose.connect("mongodb://my-database:27017/mydocker04"); // 네임리졸루션 ex)"mongodb://my-database:27017/mydocker04"

// Backend API 서버 오픈!!

app.listen(3000, () => {
  console.log("서버프로그램을 켜는데 성공했어요! (3000)");
});
