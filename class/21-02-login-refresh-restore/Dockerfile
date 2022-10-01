FROM node:14

# RUN mkdir myfolder myfolder가 없으면 COPY할 떄, 어차피 자동으로 만들어짐
WORKDIR /myfolder/
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
RUN yarn install


# . 은 모든 폴더
COPY . /myfolder/
CMD yarn dev
# docker build . 빌드업 
# docker images 이미지로 담는것
# docker ps //docker 상태 확인
# docker exec -it 998040abe6a7 /bin/bash  / docker 안에 들어가는 명령어
# exit / docker 밖으로 나오는 명령어
# docker run -p 3000(입구):3000(express 입구) b8e80b6ea8ed / 0.0.0.0 : 누구든지
# index.js에서 포트가 바뀌게 될 경우 다시 빌드하여 포트포워딩 다시 실행
# 임시 저장 공간(cash), 

# 컴퓨터 끄는 방법
# docker stop Id(실행된 컴퓨터 끄기), docker ps -a(꺼진 컴퓨터 보기),
#docker ps -a -q(아이디만 추출), backend % docker rm `docker ps -a -q`(꺼진 컴퓨터 삭제)
#docker images -q(이미지 id 추출),docker rmi `docker images -q`(이미지 id 모두 삭제)
#docker system prune -a(초기화에 가까움) (cash,networks,images)