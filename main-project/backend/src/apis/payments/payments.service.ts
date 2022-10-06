import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { DataSource, Repository } from 'typeorm';
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

    private readonly dataSource: DataSource,
  ) {}
  async create({ impUid, amount, user: _user }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    //////////////////////// transaction 시작!! //////////////////////////
    await queryRunner.startTransaction('SERIALIZABLE');
    //====================================================================
    try {
      // 1. PointTransaction 테이블에 거래기록 1줄 생성
      const pointTransaction = this.paymentRepository.create({
        impUid: impUid,
        amount: amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointsTransactionsRepository.save(pointTransaction);
      const result = await queryRunner.manager.save(pointTransaction);
      // throw new Error('강제로 에러 발생!!');
      
      // 2. 유저의 돈 찾아오기
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
        lock: { mode: 'pessimistic_write' },
      });
      
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });
      // 3. 유저의 돈 업데이트
      // this.usersRepository.update(
      //   { id: _user.id },
      //   { point: user.point + amount },
      // );
      const updatedUser = this.usersRepository.create({
        ..._user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);
      //////////////////////// 커밋 성공 확정!! //////////////////////////
      await queryRunner.commitTransaction();
      //====================================================================
      // 4. 최종결과 프론트엔드에 돌려주기
      return result;
    } catch (error) {
      //////////////////////// rollback 성공 확정!! //////////////////////////
      await queryRunner.rollbackTransaction();
      //====================================================================
    } finally {
      await queryRunner.release();
    }
  }
  async findPaymentById({ impUid }) {
    return await this.paymentRepository.findOne({ where: { impUid } });
  }
  async findAllPaymentById({ impUid }) {
    return await this.paymentRepository.find({ where: { impUid } });
  }

  async refund({ impUid, access_token, userId }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    //////////////////////// transaction 시작!! //////////////////////////
    await queryRunner.startTransaction('SERIALIZABLE');

    try{
      const isPaymentexist = await this.findAllPaymentById({ impUid });
      if (isPaymentexist == null) {
        throw new UnprocessableEntityException('결제 정보를 확인할 수 없습니다.');
      } else {
        for (let i = 0; i < isPaymentexist.length; i++) {
          if (isPaymentexist[i].status === POINT_TRANSACTION_STATUS_ENUM.CANCEL)
            throw new UnprocessableEntityException('이미 취소된 결제입니다.');
        }
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
        const amount = 0 - getCancelData.data.response.cancel_amount;
        const pointTransaction = this.paymentRepository.create({
          impUid: impUid,
          amount,
          user: userId,
          status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
        });
        const result = await queryRunner.manager.save(pointTransaction);
        // 2. 유저의 돈 찾아오기
        const user = await queryRunner.manager.findOne(User, {
          where: { id: userId.id },
          lock: { mode: 'pessimistic_write' },
        });
        // 3. 유저의 돈 업데이트
        this.usersRepository.update(
          { id: user.id },
          { point: user.point + amount },
        );
        // 4. 최종결과 프론트엔드에 돌려주기
        return result;
      }
    } catch (error) {
      //////////////////////// rollback 성공 확정!! //////////////////////////
      await queryRunner.rollbackTransaction();
      //====================================================================
    } finally {
      await queryRunner.release();
    }
  }
}
