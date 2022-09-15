function getToday() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = ("0" + (date.getMonth() + 1)).slice(-2);
  const dd = ("0" + date.getDay()).slice(-2);
  const hh = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const ms = ("0" + date.getSeconds()).slice(-2);
  console.log(`오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${hh}:${minutes}:${ms}입니다.`);
}

getToday();
