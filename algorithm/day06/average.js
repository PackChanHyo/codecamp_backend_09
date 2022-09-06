let arr = [1, 2, 3, 4];

// function solution(arr) {
//     let sum = 0
//     for(let i = 0; i < arr.length; i++){
//         sum += arr[i]
//     }
//     return sum/arr.length
// }

// reduce = 배열에만 사용

function solution(arr) {
  const sum = arr.reduce((acc, cur) => {
    return acc + cur;
  });
  return sum / arr.length;
}

//accumulator = 누산기(누적계산)
