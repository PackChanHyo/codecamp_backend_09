// const express = require("express");
import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { CashService } from "./mvc/controllers/services/cash.js";
import { ProductsService } from "./mvc/controllers/services/product.js";
import { PointService } from "./mvc/controllers/services/point.js";
const app = express();

const productsService = new ProductsService();
const cashService = new CashService(); // new 한번으로 모든 곳에서 재사용 가능(싱글톤패턴)
const pointService = new PointService(); // 2. 쿠폰 구매방식이 포인트 결제로 변경됨

// 함수를 위치에 넣기위해 api 안에 함수 ()를 하면 안된다.()하게되면 실행이 되버린다.
// 바로보기를 원할때는 커맨드+클릭, 다시 돌아오려면 ctrl + -, 재진입을 원할 때 ctrl + shift + -

// 상품 API
const productController = new ProductController(cashService, productsService);
app.post("/products/buy", productController.buyProduct); // 상품 구매하기 API
app.post("/products/refund", productController.refundProduct); // 상품 환불하기 API

// 쿠폰(상품권) API
const couponController = new CouponController(pointService);
app.post("/coupons/buy", couponController.buyCoupon); //쿠폰(상품권) 구매하기 API

app.listen(3000);

// 1. ProductController가 CashService에 의존하고있음 (CashService => 의존성)
//    이 상황을 "강하게 결합되어있다." 라고 표현 => tight-coupling

// 2. 개선하기 위해서 "느슨한 결합으로"으로 변경할 필요가 있음 => loose-coupling
//    변경을 하기위해 밖에서 "의존성주입" 해줌 => Dependency-Injection(DI)
//    이 역할을 대신 해주는 Nest.js 도구 => IoC 컨테이너 => Inversion Of Control

// 3. "의존성주입"으로 new를 2번 이상 할 필요가 없어짐, 또한 하나의 의존성을 여러곳에서 재사용
// //    대상 class의 소스코드를 직접 수정하지 않고 변경 가능 (cashService => pointService 바꿔치기) => 핵심!!!

// 4. 단, "의존성주입" 이면 "싱글톤패턴" 인가? => 아님!! (단지, 디폴트가 "싱글톤"일 뿐!!)
