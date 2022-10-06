import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  Payment,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/patment.entity';

@Injectable()
export class PayMentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async findPaymentById({ impUid }) {
    return await this.paymentRepository.findOne({ where: { impUid } });
  }
  async create({ impUid, amount, user: _user }) {
    // 1. PointTransaction 테이블에 거래기록 1줄 생성
    const pointTransaction = this.paymentRepository.create({
      impUid: impUid,
      amount: amount,
      user: _user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    const result = await this.paymentRepository.save(pointTransaction);
    // 2. 유저의 돈 찾아오기
    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });
    // 3. 유저의 돈 업데이트
    this.usersRepository.update(
      { id: _user.id },
      { point: user.point + amount },
    );
    // 4. 최종결과 프론트엔드에 돌려주기
    return result;
  }

  async findAllPaymentById({ impUid }) {
    return await this.paymentRepository.find({ where: { impUid } });
  }

  async refund({ impUid, access_token, userId }) {
    // 결제와 취소된 아이디를 찾아오기 만약 결제나 취소가 없을 경우 오류 보내기
    const isPaymentexist = await this.findAllPaymentById({ impUid });
    if (isPaymentexist == null) {
      throw new UnprocessableEntityException('결제 정보를 확인할 수 없습니다.');
    } else {
      // 하나의 uid로 결제와 취소는 두번이기때문에 만약 취소가 된 거래가 있을경우 오류 보낵기
      for (let i = 0; i < isPaymentexist.length; i++) {
        if (isPaymentexist[i].status === POINT_TRANSACTION_STATUS_ENUM.CANCEL)
          throw new UnprocessableEntityException('이미 취소된 결제입니다.');
      }
      // 검증이후 환불 요청 도와주기
      const getCancelData = await axios({
        url: 'https://api.iamport.kr/payments/cancel',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: access_token, // 아임포트 서버로부터 발급받은 엑세스 토큰
        },
        data: {
          imp_uid: impUid,
        },
      });
      // 유저가 가지고 있던 포인트에 환불된 금액 추가하기
      const amount = 0 - getCancelData.data.response.cancel_amount;
      // DB에 저장하기 위해 테이블에 1줄을 추가하기
      const pointTransaction = this.paymentRepository.create({
        impUid: impUid,
        amount,
        user: userId,
        status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
      });
      const result = await this.paymentRepository.save(pointTransaction);
      // 2. 유저의 돈 찾아오기
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      // 3. 유저의 돈 업데이트
      this.usersRepository.update(
        { id: user.id },
        { point: user.point + amount },
      );
      // 4. 최종결과 프론트엔드에 돌려주기
      return result;
    }
  }
}
