import { Injectable } from '@nestjs/common';
import { CreateStarbucksInput } from './dto/createStarbucks.input';

@Injectable()
export class StarbucksService {
  findAll() {
    const result = [
      {
        menu: '아메리카노',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '카페라떼',
        price: 5000,
        kcal: 110,
        saturated_fat: 4,
        protein: 6,
        salt: 70,
        sugar: 8,
        caffeine: 75,
      },
      {
        menu: '콜드브루',
        price: 5000,
        kcal: 15,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '카페모카',
        price: 5500,
        kcal: 50,
        saturated_fat: 5,
        protein: 5,
        salt: 70,
        sugar: 5,
        caffeine: 75,
      },
      {
        menu: '에스프레소',
        price: 4000,
        kcal: 1,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
    ];
    return result;
  }
  createStarbucks({ createStarbucksInput }) {
    console.log({ createStarbucksInput });
    return '등록에 성공하였습니다.';
  }
}
