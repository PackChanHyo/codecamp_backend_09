class Mycar {
  model = "kia";
  power = 200;
  color = "흰색";
  constructor(car, mp, white) {
    this.model = car;
    this.power = mp;
    this.color = white;
  }
  start = () => {
    console.log(
      "나의 차는 " +
        this.model +
        " 나의 마력은" +
        this.power +
        " 나의 색깔은 " +
        this.color +
        "으로 출발합니다"
    );
  };

  stop = () => {
    console.log(
      "나의 차는 " +
        this.model +
        " 나의 마력은" +
        this.power +
        " 나의 색깔은 " +
        this.color +
        "으로 정지합니다"
    );
  };
}

const sonata = new Mycar("sonata", 100, "빨간색");
sonata.start();
sonata.stop();

const kia = new Mycar("kia", 150, "노랑색");
kia.start();
kia.stop();

const k5 = new Mycar("k5", 130, "검정색");
k5.start();
k5.stop();
