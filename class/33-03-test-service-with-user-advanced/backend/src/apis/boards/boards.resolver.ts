import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';
//핵심 API
@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardsService: BoardsService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // @Query(() => String, { nullable: true })
  // getHello(): string {
  //   return this.boardsService.qqq();
  // }
  @Query(() => String)
  async fetchBoards() {
    const mycache = await this.cacheManager.get('aaa');
    console.log(mycache);
    return '캐시에서 조회 완료';
    ////////////////////////////////////////////
    // 레디스 연습을 위해서 잠시 주석 걸기!!
    // return this.boardsService.findAll();
  }
  @Mutation(() => String)
  async createBoard(
    // @Args('writer') writer: string,
    // @Args('title') writer: string,
    // @Args('contents') writer: string,
    @Args({ name: 'createBoardInput', nullable: true })
    createBoardInput: CreateBoardInput,
  ) {
    // 1. 캐시에 등록하는  연습
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 0, //
    });
    return '캐시에 등록 완료!!';
  }
}
