import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/types/context';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointsTransactions.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointsTransactionsService: PointTransactionService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    return this.pointsTransactionsService.create({ impUid, amount, user });
  }
}
