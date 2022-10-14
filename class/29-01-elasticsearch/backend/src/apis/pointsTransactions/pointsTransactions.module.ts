import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionResolver } from './pointsTransactions.resolver';
import { PointTransactionService } from './pointsTransactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PointTransaction, User])],
  providers: [
    PointTransactionResolver, //
    PointTransactionService,
  ],
})
export class PointsTransactionsModule {}
