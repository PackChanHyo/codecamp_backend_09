import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOne({ email }) {
    return this.userRepository.findOne({ where: { email } });
  }

  // hashedPassword를 받을때 이름을 다른이름으로 저장하려면 hashedPassword:qqq 이런식으로 변경할 수 있다.
  async create({ email, hashedPassword: password, name, age }) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');
    return this.userRepository.save({
      email,
      password,
      name,
      age,
    });
  }
}
