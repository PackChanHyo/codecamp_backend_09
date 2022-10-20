import { Controller, Get, Post } from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  fetchBoards() {
    return ' 성공 ';
  }

  @Post()
  createBoards() {
    return ' 성공 ';
  }
}
