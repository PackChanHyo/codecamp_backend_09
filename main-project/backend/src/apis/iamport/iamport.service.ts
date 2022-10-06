import { Injectable, Res, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class iamPortsService {
  async createIamPortToken() {
    // accss_token 받아오기
    const get_Token = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.IAMPORT_KEY, // REST API키
        imp_secret: process.env.IAMPROT_SECRET, // REST API Secret
      },
    });
    return get_Token.data.response.access_token;
  }
  async getPaymentData({ impUid }) {
    //받아온 token 으로 결제 정보 조회하기
    const token = await this.createIamPortToken();
    console.log(token);
    const getPayment: any = await axios({
      url: 'https://api.iamport.kr/payments/' + impUid,
      method: 'get',
      headers: { Authorization: token },
    }).catch((err) => {
      console.log(err);
    });
    // const paymentData = getPaymentdata.data.response;
    // console.log(paymentData);
    // console.log(getPaymentdata)
    return getPayment;
  }
}
