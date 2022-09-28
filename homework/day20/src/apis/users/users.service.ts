import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne({ userId }) {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async create({ userInput }) {
    const { ...user } = userInput;
    const users = await this.userRepository.findOne({
      where: { email: userInput.email },
    });
    if (users) {
      throw new UnauthorizedException('이미 등록된 이메일입니다.');
    }
    const result = await this.userRepository.save({
      ...user,
    });

    return result;
  }

  async update({ userId, updateUserInput }) {
    const myuser = await this.userRepository.findOne({
      where: { id: userId },
    });
    const result = await this.userRepository.save({
      ...myuser,
      id: userId,
      ...updateUserInput,
    });
    return result;
  }
  async delete({ userId }) {
    const result = await this.userRepository.delete({ id: userId });
    return result.affected ? true : false;
  }
}
