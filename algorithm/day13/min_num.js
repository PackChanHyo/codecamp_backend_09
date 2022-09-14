function solution(arr) {
  if (arr.length > 1) {
    let arr1 = Math.min(...arr);
    let arr2 = arr.indexOf(arr1);
    arr.splice(arr2, 1);
  } else {
    return [-1];
  }
  return arr;
}

solution([4, 3, 2, 1]);

//for문

// function solution(arr) {
//     const answer = [];
//     let min = arr[0];
//     for (let i = 0; i < arr.length; i++){
//         if(arr[i] < min){
//             min = arr[i]
//         }
//     }
//     for (let i = 0; i < arr.length; i++){
//         if(arr[i] !== min){
//             answer.push(arr[i])
//         }

// }

// function solution(arr) {
// const min = Math.min(...arr)
// const answer = arr.filter((num)=>{
// return num !== min
// })
// return answer.length === 0 ? [-1] : answer
// }
