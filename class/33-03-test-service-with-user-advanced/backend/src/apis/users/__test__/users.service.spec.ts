import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

// 나만의 미니 TypeORM 만들기
class MockUsersRepository {
  mydb = [
    { email: 'a@a.com', password: '0000', name: '짱구', age: 8 },
    { email: 'qqq@qqq.com', password: '1234', name: '철수', age: 12 },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const usesModule: TestingModule = await Test.createTestingModule({
      //   imports: [],
      //   controllers: [],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = usesModule.get<UsersService>(UsersService);
  });

  //   describe('findeOne', () => {
  //     const result = usersService.findOne({ "이메일" });
  //     expect(result).toBe("결과")
  //   });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
      const myDate = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };
      try {
        await usersService.create({ ...myDate });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('회원 등록 잘 됐는지 검증!!', async () => {
      const myData = {
        email: 'bbb@bbb.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };
      const result = await usersService.create({ ...myData });
      expect(result).toStrictEqual({
        email: 'bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 13,
      });
    });

    //
  });
});
