function grade(score) {
  if (score > 100 || score < 0) {
    return "잘못된 점수입니다.";
  }
  if (score <= 100 && score >= 90) {
    // 90 ~ 100
    return "A";
  } else if (score <= 89 && score >= 80) {
    return "B";
  } else if (score <= 79 && score >= 70) {
    return "C";
  } else if (score <= 69 && score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

console.log(grade(105));
console.log(grade(-10));
console.log(grade(97));
console.log(grade(86));
console.log(grade(75));
console.log(grade(66));
console.log(grade(52));
