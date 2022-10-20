import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;
  beforeEach(() => {
    const appService = new AppService();
    appController = new AppController(appService);
  });

  describe('getHello', () => {
    it('이 테이스의 검증 결과는 Hello World를 리턴해야함!!!', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  //   describe('fetchBoards', () => {
  //   appController.fetchBoards();
  //   });

  //   describe(() => {
  //     appController.create
  //   });
});
