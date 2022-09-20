function solution(s) {
  const answer = s
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word !== "" ? word[0].toUpperCase() + word.slice(1) : word;
    });
  return answer.join(" ");
}
