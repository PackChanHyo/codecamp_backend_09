function solution(numbers) {
  const answer = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];
      if (!answer.includes(sum)) {
        answer.push(sum);
      }
    }
  }
  return answer.sort((a, b) => a - b);
}

solution([2, 1, 3, 4, 1]);

// function solution(numbers) {
//     const answer = new Set([]);

//     for(let i = 0; i < numbers.length; i++){
//         for(let j = i + 1; j < numbers.length; j++){
//             const sum = numbers[i] + numbers[j]
//             answer.add(sum)
//             // if(!answer.includes(sum)){
//             //   answer.push(sum)
//             // }
//         }
//     }
//     return [...answer].sort((a,b) => a -b)
// }

// forEach문

// function solution(numbers) {
//     const answer = new Set([]);
//     numbers.forEach((num1,i) => {
//         numbers.slice(i + 1).forEach((num2) => {
//             const sum = num1 + num2
//             answer.add(sum)
//         })
//     })
//     return [...answer].sort((a,b) => a - b)
// }
