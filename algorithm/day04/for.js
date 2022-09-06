// for문
for (let i = 0; i < 5; i++) {
  //   console.log("안녕하세요?");
}
// '안녕하세요?'
// '안녕하세요?'
// '안녕하세요?'
// '안녕하세요?'
// '안녕하세요?'

//brak문 = 원하는 구간에서 반복문 종료
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    break;
  }
  //   console.log(i); // 0 1 출력
}

//continue = 해당 구간의 반복문을 실행하지 않음
for (let i = 0; i < 5; i++) {
  if (i === 3) {
    continue;
  }
  //   console.log(i); // 0 1 2 4 출력
}

//---------------------------------------------------

// for-in 문 => 객체를 반복할 수 있다.
// 사용 범위 : 문자열,객체,배열  문법 : for(let key in object)
const user = {
  name: "otter",
  age: 10,
};

for (let key in user) {
  console.log(key); // name age 출력
  console.log(user[key]); //name,otter,age,10 출력
}

// -------------------------------------------------------
// for - of 문 => 각각의 요소들을 가져올 수 있다.
// 사용 범위 : 문자열, 배열 | 문법 : for( let key of object)
const arr = ["a", "b", "c", "d"];

for (let key of arr) {
  console.log(key); // a, b, c, d 출력
}

//----------------------------------------------------

// forEach문 => 배열에만 사용할 수 있다.
// 사용범위 : 배열 | 문법 Array.forEach(function())
const arr1 = ["a", "b", "c", "d"];

arr.forEach((data, idx) => {
  console.log(data, idx); //a' 0, 'b' 1, 'c' 2, 'd' 3 출력
});

// while문 => 최초식, 조건식, 증감식이 분할되어 사용
// 사용범위 : for와 동일 | 문법 : while()
let answer = 0; // 로봇이 움직이는 횟수
let current = 0; // 로봇의 현재 위치

while (current !== 100) {
  console.log(current); // 1~ 99까지 출력
  current++;
  answer++;
  // currnent = currnent + 1;
}
