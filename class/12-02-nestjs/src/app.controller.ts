import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

export class AppController {
  appService;

  constructor(private readonly appService) {
    this.appService = appService;
  }

  @Get('/product/buy') //엔드포인트 적는곳
  buyProduct(): string {
    return this.appService.getHello();
  }
}

// @ : 데코레이터
