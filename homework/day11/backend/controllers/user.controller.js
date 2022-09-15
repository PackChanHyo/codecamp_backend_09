import {
  MaskingNum,
  checkEmail,
  createMessage,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./services/email.js";
import { UsersMb } from "../models/userSchema.js";
import { Phone } from "../models/tokenSchema.js";
export class UserController {
  PostUser = async (req, res) => {
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
  };
}
