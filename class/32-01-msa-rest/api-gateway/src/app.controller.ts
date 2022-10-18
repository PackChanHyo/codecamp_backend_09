import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // appService;

  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,
    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  // @Get('/product/buy') //엔드포인트 적는곳
  // buyProduct(): string {
  //   return this.appService.getHello();
  // }

  @Get('/auth/login')
  login() {
    // auth-service로 트래픽 넘겨줌
    return this.clientAuthService.send(
      { qqq: '로그인실행해줘' }, // qqq는 단지 실습용, 보통은 cmd: 'login'으로 작성
      { email: 'a@a.com', password: '1234' },
    );
  }

  @Get('/boards')
  fetchBoards() {
    // resource-service로 트래픽 넘겨줌
    return this.clientResourceService.send({ cmd: 'fetchBoards' }, {});
  }
}

// @ : 데코레이터
