import { ProductsService } from "./services/product.js";

export class ProductController {
  cashService;
  productsService;

  constructor(cashService) {
    this.cashService = cashService;
    this.productsService = ProductsService;
  }

  buyProduct = () => {
    (req, res) => {
      // 1. 가진돈 검증하는 코드 (대략 10줄 => 2줄 => 1줄)
      const hasMoney = this.cashService.checkValue();

      // 2. 판매 여부 검증 하는 코드 (대략 10줄 => 2줄)

      const isSoldout = this.productsService.checkSoldout();

      // 3. 상품 구매하는 코드
      if (hasMoney && !isSoldout) {
        res.send("상품 구매 완료");
      }
    };
  };

  refundProduct = () => {
    (req, res) => {
      // 1. 판매여부 검증 하는 코드 (대략 10줄 => 2줄)
      const productsService = new ProductsService();
      const isSoldout = productsService.checkSoldout();

      // 2. 상품 환불하는 코드
      if (isSoldout) {
        res.send("상품 환불 완료");
      }
    };
  };
}
