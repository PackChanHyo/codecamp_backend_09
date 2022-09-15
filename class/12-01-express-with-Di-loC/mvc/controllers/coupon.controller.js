export class CouponController {
  pointService;

  constructor(pointService) {
    this.pointService = pointService;
  }

  buyCoupon = (req, res) => {
    // 1. 가진 돈 검증하는 코드(10줄)
    const hasMoney = this.pointService.checkValue();

    // 2. 쿠폰 구매하는 코드
    if (hasMoney) {
      res.send("쿠폰 구매 완료!!");
    }
  };
}
