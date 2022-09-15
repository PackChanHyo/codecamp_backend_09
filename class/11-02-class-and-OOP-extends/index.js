// class Date{
// getFullYear(){
//
// }
//
// getMonth(){
//
// }
// }

const aaa = new Date();
console.log(aaa.getFullYear());
console.log(aaa.getMonth() + 1);

class Monster {
  power = 10;
  // this라는 이름을 써야 power를 가져올 수 있다.

  constructor(aaa) {
    this.power = aaa;
  }

  attack = () => {
    console.log("공격하자!!");
    console.log("내 공격력은" + this.power + "야!!!");
  };
}

// extends 상속한다. 다중 상속은 일반적으론 안된다.
class 공중몬스터 extends Monster {
  constructor(qqq) {
    //생성자 constructor
    super(qqq); //부모 생성자에게 토스해준다.
  }
  run = () => {
    console.log("날라서 도망가자!!");
  };
}
class 지상몬스터 extends Monster {
  constructor(www) {
    super(www);
  }
  run = () => {
    console.log("뛰어서 도망가자");
  };
}

const mymonster1 = new 공중몬스터(20);
mymonster1.attack();
mymonster1.run();

const mymonster2 = new 지상몬스터(50);
mymonster2.attack();
mymonster2.run();
