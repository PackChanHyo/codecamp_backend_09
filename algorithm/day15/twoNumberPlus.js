function solution(a, b) {
  let answer = 0;
  if (a === b) {
    return a;
  } else {
    const start = Math.min(a, b);
    const end = Math.max(a, b);
    for (let i = start; i <= end; i++) {
      answer += i;
    }
  }
  return answer;
}

solution(3, 5);
