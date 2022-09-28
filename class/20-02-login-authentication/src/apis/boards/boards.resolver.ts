import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';
//핵심 API
@Resolver()
export class BoardResolver {
  constructor(private readonly boardsService: BoardsService) {}

  // @Query(() => String, { nullable: true })
  // getHello(): string {
  //   return this.boardsService.qqq();
  // }
  @Query(() => [Board])
  fetchBoards() {
    return this.boardsService.findAll();
  }
  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string,
    // @Args('title') writer: string,
    // @Args('contents') writer: string,
    @Args({ name: 'createBoardInput', nullable: true })
    createBoardInput: CreateBoardInput,
  ) {
    return this.boardsService.create({ createBoardInput });
  }
}
