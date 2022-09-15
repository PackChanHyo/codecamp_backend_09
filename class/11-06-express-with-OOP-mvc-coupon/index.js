// const express = require("express");
import express from "express";
import {
  ProductController,
  ProductController,
} from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
const app = express();

// 함수를 위치에 넣기위해 api 안에 함수 ()를 하면 안된다.()하게되면 실행이 되버린다.
// 바로보기를 원할때는 커맨드+클릭, 다시 돌아오려면 ctrl + -, 재진입을 원할 때 ctrl + shift + -

// 상품 API
const productController = new ProductController();
app.post("/products/buy", productController.buyProduct); // 상품 구매하기 API
app.post("/products/refund", productController.refundProduct); // 상품 환불하기 API

// 쿠폰(상품권) API
const couponController = new CouponController();
app.post("/coupons/buy", couponController.buyCoupon); //쿠폰(상품권) 구매하기 API
