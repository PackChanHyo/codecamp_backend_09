import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,
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
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid: impUid,
        amount: amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      console.log(pointTransaction);
      // await this.pointsTransactionsRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);

      // throw new Error('강제로 에러 발생!!');

      // 2. 유저의 돈 찾아오기
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
        lock: { mode: 'pessimistic_write' },
      });

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
      return pointTransaction;
    } catch (error) {
      //////////////////////// rollback 성공 확정!! //////////////////////////
      await queryRunner.rollbackTransaction();
      //====================================================================
    } finally {
      await queryRunner.release();
    }
  }
}
