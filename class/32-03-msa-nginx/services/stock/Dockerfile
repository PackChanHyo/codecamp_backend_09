FROM node:14

# RUN mkdir auth-service myfolder가 없으면 COPY할 떄, 어차피 자동으로 만들어짐
WORKDIR /auth-service/
COPY ./package.json /auth-service/
COPY ./yarn.lock /auth-service/
RUN yarn install


# . 은 모든 폴더
COPY . /auth-service/
CMD yarn start:dev
