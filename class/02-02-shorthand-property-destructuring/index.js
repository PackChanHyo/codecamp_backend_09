// 1. shorthand-property
function qqq(aaa) {
  console.log(aaa);
  console.log(aaa.name); // 철수
  console.log(aaa.age); // 12
  console.log(aaa.school); // 다람쥐초등학교
}

const name = "철수";
const age = 12;
const school = "다람쥐초등학교";
// const profile = {
//   name: name,
//   age: age,
//   school: school,
// };
// const profile = { name, age, school }; // 키와 벨류가 같아서 벨류를 생략함 => shorthand-property
qqq({ name, age, school }); // qqq(profile) 이것과 같음

// 2. destructuring

// 원본
function www(aaa) {
  console.log(aaa); // { apple: 3, banana: 10} ==> const aaa = basket과 같은 얘기
  // const aaa = {apple: 3, banana: 10 } 이것과 동일한 얘기
  // const {apple, banana} = { apple: 3, banana: 10} 이런 방식으로 구조분해할당 가능
}

// 사용할 함수
function www(apple, banana) {
  // const {apple, banana} = basket
}

const basket = {
  apple: 3,
  banana: 10,
};
www(basket);
