function solution(s) {
  s += " ";
  let [min, max] = [0, 0];

  let str = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      str = Number(str);
      if (min === 0 || max === 0) {
        // 기준점 구하기 (가장 먼저 가져오는 숫자)
        [min, max] = [str, str];
      } else {
        // 두번째부터 가져오는 숫자
        min = str < min ? str : min;
        max = str > max ? str : max;
      }

      str = "";
      continue;
    }
    str += s[i];
  }
  return min + " " + max;
}

// 메소드 풀이법

// function solution(s) {
// s = s.split(" ");
//
// const max = Math.max( ...s );
// const min = Math.min( ...s );
//
// return `${min} ${max}`
// }
