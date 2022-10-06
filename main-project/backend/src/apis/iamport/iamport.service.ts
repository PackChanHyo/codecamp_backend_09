import { Injectable, Res, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class iamPortsService {
  async createIamPortToken() {
    const get_Token = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.IAMPORT_KEY, // REST API키
        imp_secret: process.env.IAMPORT_SECRET, // REST API Secret
      },
    });
    console.log(get_Token.data.response.access_token);
    return get_Token.data.response.access_token;
  }
  async getPaymentData({ impUid }) {
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
