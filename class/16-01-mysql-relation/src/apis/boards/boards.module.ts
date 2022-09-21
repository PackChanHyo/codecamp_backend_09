import { Module } from '@nestjs/common';
import { BoardResolver } from './boards.resolver';
import { BoardsService } from './boards.service';
@Module({
  providers: [BoardResolver, BoardsService],
})
export class BoardsModule {}
