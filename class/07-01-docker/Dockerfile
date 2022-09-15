# 컴퓨터 만드는 설명서

# 1. 운영체제 설치 (node 14번과 npm과 yarn이 모두 설치되어있는 리눅스)

FROM node:14

# 2. Nodejs와 yarn 설치하기

# RUN apt install nodejs
# RUN npm install -g yarn

# 3. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안을 복사하기

COPY ./index.js /

# 4. 도커안에서 index.js 실행시키기
CMD node index.js

#build 실행 코드로 쓰게 되면 (1, 2, 3번 압축), CMD 전줄까지만 압축,
#최종 파일 만들게 되면 CMD 실행!