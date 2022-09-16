import { Resolver, Query } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
//핵심 API
@Resolver()
export class BoardResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => String, { nullable: true })
  getHello(): string {
    return this.boardsService.qqq();
  }
}
