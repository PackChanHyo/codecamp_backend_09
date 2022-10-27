function solution(s) {
  let answer = 0;
  for (let i = 0; i < s.length; i++) {
    s = s.slice(1) + s[0];
    const list = { large: 0, middle: 0, small: 0 };

    for (let j = 0; j < s.length; j++) {
      if (s[j] === "]") list.large--;
      if (s[j] === "}") list.middle--;
      if (s[j] === ")") list.small--;

      if (s[j] === "[") list.large++;
      if (s[j] === "{") list.middle++;
      if (s[j] === "(") list.small++;

      if (list.large === -1 || list.middle === -1 || list.small === -1) {
        break;
      }

      if (j === s.length - 1) {
        if (list.large !== 0 || list.middle !== 0 || list.small !== 0) {
          break;
        }
        answer++;
      }
    }
  }
  return answer;
}
