const myShopping = [
  { category: "과일", price: 12000 },
  { category: "의류", price: 10000 },
  { category: "의류", price: 20000 },
  { category: "장난감", price: 9000 },
  { category: "과일", price: 5000 },
  { category: "의류", price: 10000 },
  { category: "과일", price: 8000 },
  { category: "의류", price: 7000 },
  { category: "장난감", price: 5000 },
  { category: "의류", price: 10000 },
];
function grade(list) {
  let count = 0; // 의류를 구매한 횟구
  let amount = 0; // 사용금액
  let gr = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].category === "의류") {
      count += 1;
      amount += list[i].price;
    }
  }
  if (count >= 5) {
    gr = "Gold";
  } else if (count >= 3) {
    gr = "Silver";
  } else {
    gr = "Bronze";
  }
  return `의류를 구매한 횟수는 총 ${count}회 금액은 ${amount}원이며 등급은 ${gr}입니다.`;
}

grade(myShopping);
