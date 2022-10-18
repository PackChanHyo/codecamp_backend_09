import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {
    this.appService = appService;
  }

  // @Get('/product/buy') //엔드포인트 적는곳
  // buyProduct(): string {
  //   return this.appService.getHello();
  // }

  @Query(() => String)
  fetchBoards() {
    return '데이터 보내기 성공!!';
  }
}

// @ : 데코레이터
