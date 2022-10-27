function solution(priorities, location) {
  const origin = priorities[location];
  priorities[location] = "a";

  let answer = 0;
  while (true) {
    const search = priorities.indexOf("a");
    priorities[search] = origin;
    const max = Math.max(...priorities);
    priorities[search] = "a";

    if (priorities[0] === "a") {
      // 대기열의 가장 앞에 있는 문서가 내가 뽑고자 하는 문서가 맞을 때
      if (origin === max) {
        // 내가 뽑고자 하는 문서의 중요도가 대기열에서 가장 클 때
        return ++answer;
      }
    }

    if (priorities[0] === max) {
      // 현재 인쇄하려는 문서가 대기열의 가장 큰 중요도를 가지고 있다면
      // === 현재 문서를 인쇄한다.
      priorities.shift();
      answer++;
    } else {
      // 현재 대기열에 더 큰 중요도를 가지는 문서가 있다면
      // === 현재 문서를 뒤로 보낸다.
      priorities.push(priorities[0]);
      priorities.shift();
    }
  }
}
