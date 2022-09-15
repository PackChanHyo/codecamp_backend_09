import express from "express";
import cors from "cors";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import { Phone } from "./models/token.model.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/tokens/phone", async (req, res) => {
  const myphone = req.body.myphone;
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkPhone(myphone);
  if (isValid === false) return;

  // 2. 핸드폰 토큰 6자리 만들기
  const mytoken = getToken();

  // 3. 핸드폰 번호가 DB에 저장되어있는가?
  if (await Phone.findOne({ phone: myphone })) {
    await Phone.updateOne({ phone: myphone }, { token: mytoken });
  } else {
    const phoneNum = new Phone({
      token: mytoken,
      phone: req.body.myphone,
      isAuth: false,
    });
    await phoneNum.save();
    console.log(myphone, mytoken);
  }

  // 4. 핸드폰번호에 토큰 전송하기
  sendTokenToSMS(myphone, mytoken);

  res.send("인증완료!!!");
});

app.patch("/tokens/phone", async (req, res) => {
  const { myphone, mytoken } = req.body;
  if (!(await Phone.findOne({ phone: myphone }))) {
    res.send(false);
  } else if (!(await Phone.findOne({ token: mytoken }))) {
    res.send(false);
  } else {
    await Phone.updateOne({ token: mytoken }, { isAuth: true });
    res.send(true);
    return;
  }
});

// 몽고DB 접속 !!
mongoose.connect("mongodb://my-database:27017/mydocker04");

app.listen(3000, () => {
  console.log("서버프로그램을 켜는데 성공했어요! (3000)");
});
