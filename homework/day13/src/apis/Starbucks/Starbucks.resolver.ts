import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStarbucksInput } from './dto/createStarbucks.input';
import { StarBucks } from './entities/Starbucks.entity';
import { StarbucksService } from './Starbucks.service';

@Resolver()
export class StarbucksResolver {
  constructor(private readonly starbucksService: StarbucksService) {}

  @Query(() => [StarBucks])
  fetchBoards() {
    return this.starbucksService.findAll();
  }
  @Mutation(() => String)
  createBoard(
    @Args({ name: 'CreateStarbucksInput', nullable: true })
    createStarbucksInput: CreateStarbucksInput,
  ) {
    return this.starbucksService.createStarbucks({ createStarbucksInput });
  }
}
