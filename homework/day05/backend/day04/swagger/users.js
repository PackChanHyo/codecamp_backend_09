export const users = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "회원목록",
      version: "1.0.0",
    },
  },
  apis: ["./swagger/*.swagger.js"], // files containing annotations as above
};
