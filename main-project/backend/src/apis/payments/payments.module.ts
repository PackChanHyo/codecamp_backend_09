import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { iamPortsService } from '../iamport/iamport.service';
import { User } from '../users/entities/user.entity';
import { Payment } from './entities/patment.entity';
import { PayMentsResolver } from './payments.resolver';
import { PayMentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User])],
  providers: [
    PayMentsService, //
    PayMentsResolver,
    iamPortsService,
  ],
})
export class PayMentsModule {}
