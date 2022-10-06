import {
  ConflictException,
  Get,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/context';
import { iamPortsService } from '../iamport/iamport.service';
import { Payment } from './entities/patment.entity';
import { PayMentsService } from './payments.service';

@Resolver()
export class PayMentsResolver {
  constructor(
    private readonly paymentsService: PayMentsService,
    private readonly IamPortsService: iamPortsService,
  ) {}
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async createPayment(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    console.log(impUid, amount);
    // 결제 정보 가져오기
    const paymentInfo: any = await this.IamPortsService.getPaymentData({
      impUid,
    });
    console.log(paymentInfo);
    // 만약 결제정보가 없다면 오류 던지기
    if (paymentInfo == null) {
      throw new UnprocessableEntityException('결제 정보가 존재하지 않습니다');
    }
    // 만약 받아온 결제정보에 금액이 서로 같지 않다면 오류 보내기, 같다면 아이디를 찾고 디비에 저장
    if (paymentInfo.data.response.amount === amount) {
      const result = await this.paymentsService.findPaymentById({ impUid });
      if (result != null)
        throw new ConflictException('이미 결제된 정보입니다.');
      else return this.paymentsService.create({ impUid, amount, user });
    } else {
      throw new UnprocessableEntityException('결제 금액 오류');
    }
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async cancelPayment(
    @Args('impUid') impUid: string,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    // 토큰 받아오기
    const access_token = await this.IamPortsService.createIamPortToken();
    // 검증 후 환불 완료 처리하기
    return await this.paymentsService.refund({
      impUid,
      access_token,
      userId: user.id,
    });
  }
}
