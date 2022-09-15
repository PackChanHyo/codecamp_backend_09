import express from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkEmail,
  getWelcomeTemplate,
  MaskingNum,
  createMessage,
  sendTemplateToEmail,
} from "./email.js";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { Phone } from "./models/tokenSchema.js";
import { UsersMb } from "./models/userSchema.js";
import { Starbuck } from "./models/starbucksSchema.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
app.get("/starbucks", async function (req, res) {
  const starbucksMenu = await Starbuck.find();
  console.log(starbucksMenu);

  res.send(starbucksMenu);
});

app.get("/users", async function (req, res) {
  const result = await UsersMb.find();

  res.send(result);
});

app.post("/users", async (req, res) => {
  const { name, email, personal, prefer, pwd, phone } = req.body;
  const openGraph = await createMessage(prefer);
  const myPersonal = MaskingNum(personal);
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email);
  if (isValid === false) return;
  // 2.핸드폰 번호가 없거나, isAuth가 false라면 422상태코드 반환
  const phoneIsValid = await Phone.findOne({ phone }).exec();
  const isAuthValid = await Phone.findOne({ phone, isAuth: false }).exec();
  console.log(phoneIsValid, isAuthValid);
  if (
    (await Phone.findOne({ phone }).exec()) == null ||
    (await Phone.findOne({ phone, isAuth: false }).exec()) !== null
  ) {
    return res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다.");
  } else {
    const usersDb = new UsersMb({
      name: name,
      email: email,
      personal: myPersonal,
      prefer: prefer,
      pwd: pwd,
      phone: phone,
      og: openGraph,
    });
    await usersDb.save();
    res.send(usersDb._id);
  }
  // 4. 가입환영 템플릿 만들기
  const mytemplate = getWelcomeTemplate({
    name,
    email,
    personal,
    prefer,
    pwd,
    phone,
  });

  // // 5. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, mytemplate);
});

app.post("/tokens/phone", async (req, res) => {
  const myphone = req.body.phone;
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
      phone: myphone,
      isAuth: false,
    });
    await phoneNum.save();
    console.log(myphone, mytoken);
  }

  // 4. 핸드폰번호에 토큰 전송하기
  // sendTokenToSMS(myphone, mytoken);

  res.send("인증번호가 전송");
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
mongoose.connect("mongodb://my-database:27017/Mini-Project");

app.listen(3000, () => {
  console.log("서버프로그램을 켜는데 성공했어요! (3000)");
});
