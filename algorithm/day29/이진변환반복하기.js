function solution_for(s) {
  let count = 0;
  let remove = 0;

  while (s !== "1") {
    count++;

    let temp = "";
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "0") {
        remove++;
        continue;
      }
      temp += s[i];
    }

    s = temp.length;
    s = s.toString(2);
  }
  return [count, remove];
}

//////////////////////////////

// function solution(s) {
// let [count , remove] = [0,0];
//
//   const recursion = function(s){
//   if(s === '1'){
//   return [count,remove]
//   }
//
//   remove += s.split('').filter(el => el === '0').length
//
//
//   s = s.split('').filter(el => el !== '0').length
//    count++
//   return recursion(s.toString(2))
//
//   }
//   return recursion(s)
//   }
