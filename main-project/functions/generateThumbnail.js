const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

// 파일 업로드를 할경우 event를 작동시킬 함수트리거를 만들기
exports.ThumbnailTrigger = async (event, context) => {
  // 2-1 이미지가 트리거 된 경우 또 썸네일을 만들지 않고 함수 종료,
  // 만약 name에 thumb을 안찾고 그냥 내비뒀을 경우 지속적으로 thumb이라는 폴더와 파일을 만들어 무한 로딩을 하게된다.
  // 그러므로 만약 지속적으로 만들기전에 thumb을 찾아 로딩을 멈추게 만든다!!
  if (event.name.includes(`thumb/`)) return;

  // console.log로 찍어서 나온값을 보자면  name: 'thumb/s/강아지2.jpeg', 이런식으로 나오게된다.
  // 이미지의 대한 이름 즉, ****.jpg // ****.png 파일이름을 하나에 담는다.
  const fileName = event.name;

  // 이벤트를 콘솔로 찍게 되면 bucket: 'codecamp-storages', 이런식으로 업로드시 지정한 버켓에 스토리지로 저장한다.
  // 그걸 하나의 변수로 담아 밑에 함수를 만들어 저장하게 만든다.
  const storage = new Storage().bucket(event.bucket);

  // 사이즈 지정을 위해 배열로 담는다.
  // 각각 사이즈를 지정하여 밑에 함수에 map 메소드를 이용하여 해당하는 크기,주소를 적는다.
  // map의 경우 객체로 돌릴 수 없기 때문에 큰 배열안에 객체를 집어넣어 실행하게끔 만들었다.
  const sizes = [
    { image: 320, values: "s" },
    { image: 640, values: "m" },
    { image: 1280, values: "l" },
  ];

  // 한개의 사이즈를 지정할 경우
  // storage 의 파일 이름(event.name)을 가지고 오고 (createReadStream: 기존의 파일을 읽어오기)
  // 그리고 pipe안에 sharp 라이브러리로 사이즈를 조정해주고,
  // 조정한 사이즈를 pipe를 이용해 저장된 storage에 써준다??(저장해준다??)

  //  await new Promise((resolve, reject) => {
  // storage
  //   .file(fileName)
  //   .createReadStream()
  //   .pipe(sharp().resize({ width: 320 }))
  //   .pipe(
  // storage.file(`thumb/s/${fileName}`).createWriteStream()
  //   )
  //   .on("finish", () => resolve("성공"))
  //   .on("error", () => reject("실패"));
  //   })

  // 3개의 사이즈를 promise.all로 묶는다.
  // 각각의 사이즈를 지정하기 위해 위에 만들어진 sizes에 담긴 객체를 한번씩 돌리고
  // 한개 만들때와 똑같이 파일 이름(event.name)을 가지고 오고,(createReadStream: 기존의 파일을 읽어오기)
  //그리고 이번에는 각각의 사이즈에 맞게 넣어야 하니 el.(키값) : 320 를 넣고 밑에는 주소를 넣어야하니
  // 주소에는 el.(values): s,m,l 를 넣어 각각의 크기와 주소에 맞게 적용시킨다.

  return await Promise.all(
    sizes.map(
      (el) =>
        new Promise((resolve, reject) => {
          storage
            .file(fileName)
            .createReadStream()
            .pipe(sharp().resize({ width: el.image }))
            .pipe(
              storage.file(`thumb/${el.values}/${fileName}`).createWriteStream()
            )
            .on("finish", () => resolve("성공"))
            .on("error", () => reject("실패"));
        })
    )
  );
};
