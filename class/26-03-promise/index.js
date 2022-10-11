// 1.  .then()으로 받기
const onClickPromiseThen = () => {
  new Promise((resolve, reject) => {
    // 시간이 걸리는 작업(API 보내기 등)
    //...
    //...
    setTimeout(() => {
      const result = "철수"; // 2초가 걸려서 백엔드에서 '철수' 데이터 받아오기    },2000)
      resolve(result); // 성공하면 이거 실행
      reject("에러가 발생했어요"); // 실패하면 이거 실행
    });
  })
    .then((res) => {
      console.log(res); // 철수
    })
    .catch((err) => {
      console.log(err); // 에러가 발생했어요!
    });
};
onClickPromiseThen();

// 2.  await로 받기

const onClickPromisAwait = async () => {
  const qqq = await new Promise((resolve, reject) => {
    // 시간이 걸리는 작업(API 보내기 등)
    //...
    //...
    setTimeout(() => {
      const result = "철수"; // 2초가 걸려서 백엔드에서 '철수' 데이터 받아오기    },2000)
      resolve(result); // 성공하면 이거 실행
      //   reject("에러가 발생했어요"); // 실패하면 이거 실행
    }, 2000);
  });
  console.log("철수");
};

onClickPromisAwait();
