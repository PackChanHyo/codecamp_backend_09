function bigNum(str) {
  let biggest = 0;
  for (let i = 0; i < str.length; i++) {
    if (biggest < Number(str[i])) {
      biggest = Number(str[i]);
    }
  }
  return biggest;
}

console.log(bigNum("12345")); // 5
console.log(bigNum("87135")); // 8

// function bigNum(str) {
// 	let biggest = Number(str[0])
//   for(let i = 1; i < str.length; i++){
//     if(biggest < Number(str[i])){
//        biggest = Number(str[i])
//        }
//   }
//   return biggest
// }

// const arr = str.split('')
//   return Math.max(...arr)

// bigNum("12345") // 5
// bigNum("87135") // 8
