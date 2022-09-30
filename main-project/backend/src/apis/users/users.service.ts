import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne({ email }) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async create({ userInput, hashedPassword: pwd }) {
    const { ...user } = userInput;
    const userEmail = userInput.email;
    const hashedPassword = await bcrypt.hash(userInput.pwd, 10);
    const users = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (users) {
      throw new UnauthorizedException('이미 등록된 이메일입니다.');
    }
    const result = await this.userRepository.save({
      ...user,
      pwd: hashedPassword,
    });
    return result;
  }

  async updatePwd({ userId, pwd }) {
    const myuser = await this.userRepository.findOne({
      where: { id: userId },
    });
    const result = await this.userRepository.save({
      ...myuser,
      pwd,
    });
    return result ? true : false;
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

  async softDelete({ email }) {
    const result = await this.userRepository.softDelete({ email });
    return result.affected ? true : false;
  }
}
