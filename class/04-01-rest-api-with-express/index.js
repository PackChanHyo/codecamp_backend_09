// const express = require("express");
import express from "express";
const app = express();

app.get("/boards", function (req, res) {
  res.send("게시물 등록에 성공했습니다~");
});

// app.post("/boards"), function(){
//     "}

app.listen(3000, () => {
  console.log("서버프로그램을 켜는데 성공했어요!");
});
