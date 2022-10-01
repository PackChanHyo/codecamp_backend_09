import { Injectable } from '@nestjs/common';
import { CreateBoardInput } from './dto/createBoard.input';
// 비즈니스 로직
@Injectable()
export class BoardsService {
  // qqq() {
  // return 'Hello World!';
  // }

  findAll() {
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다.',
        contents: '내용이에요!',
      },
      {
        number: 2,
        writer: '영희',
        title: '영희입니다요~',
        contents: '영희에유!',
      },
      {
        number: 3,
        writer: '훈이',
        title: '안녕하세요.',
        contents: '훈이입니다.!',
      },
    ];
  }
  create({ createBoardInput }) {
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    return '게시물 등록에 성공하였습니다.';
  }
}
