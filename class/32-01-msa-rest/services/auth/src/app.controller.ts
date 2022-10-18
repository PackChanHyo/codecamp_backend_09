import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/product/buy') //엔드포인트 적는곳
  // buyProduct(): string {
  //   return this.appService.getHello();
  // }

  @MessagePattern({ qqq: '로그인실행해줘' })
  login(data) {
    // 실제 로그인 하기
    console.log(data);
    return '로그인 성공!!';
  }

  logout() {
    //
  }

  restoreAccessToken() {
    //
  }
}

// @ : 데코레이터
