import { Module } from '@nestjs/common';
import { StarbucksResolver } from './Starbucks.resolver';
import { StarbucksService } from './Starbucks.service';

@Module({
  providers: [StarbucksResolver, StarbucksService],
})
export class StarbucksModule {}
