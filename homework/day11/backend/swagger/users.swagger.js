/**
 *  @swagger
 * /users:
 *      get:
 *          summary : 유저 목록 가져오기
 *          tags: [users]
 *          responses:
 *              200:
 *                  description: 성공
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  properties:
 *                                      og:
 *                                          type: object
 *                                          properties:
 *                                              title:
 *                                                  type: string
 *                                                  example: 네이버
 *                                              description:
 *                                                  type: string
 *                                                  example: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요
 *                                              image:
 *                                                  type: string
 *                                                  example: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png
 *                                      name:
 *                                          type: string
 *                                          example: 철수
 *                                      email:
 *                                          type: string
 *                                          example: ala@naver.com
 *                                      personal:
 *                                          type: string
 *                                          example: 220101-1111111
 *                                      prefer:
 *                                          type: string
 *                                          example: https://naver.com
 *                                      pwd:
 *                                          type: string
 *                                          example: 12321412
 *                                      phone:
 *                                          type: string
 *                                          example: "01012345678"
 *                                      _v:
 *                                          type: int
 *                                          example: 0
 */

/**
 * @swagger
 *  /starbucks:
 *      get:
 *          summary: 스타벅스 커피 목록 가져오기
 *          tags: [starbucks]
 *          responses:
 *              200:
 *                  description: 성공
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  properties:
 *                                      _id:
 *                                          type: objectId
 *                                          example: 631f2b4a5a685e5c3eea76c5
 *                                      name:
 *                                          type: string
 *                                          example: 스타벅스
 *                                      img:
 *                                          type: string
 *                                          example: https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg
 */

/**
 * @swagger
 * /users:
 *      post:
 *          summary: 유저 등록하기
 *          tags: [users]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: 철수
 *                              email:
 *                                  type: string
 *                                  example: a@a.com
 *                              personal:
 *                                  type: string
 *                                  example: 123456-1234567
 *                              prefer:
 *                                  type: string
 *                                  example: https://www.google.com
 *                              pwd:
 *                                  type: string
 *                                  example: 1234
 *                              phone:
 *                                  type: string
 *                                  example: "01012345678"
 *          responses:
 *              "200":
 *                  description: 성공
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              example: 61e62e84bf8893ecb66f35f9
 *              "422":
 *                  description: 실패
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              example: 에러! 핸드폰 번호가 인증되지 않았습니다
 */

/**
 * @swagger
 * /tokens/phone:
 *      post:
 *          summary: 인증 토큰 요청하기
 *          tags: [tokens]
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  phone:
 *                                      type: string
 *                                      example: "01012356789"
 *          responses:
 *              200:
 *                  description: 성공
 */

/**
 * @swagger
 * /tokens/phone:
 *      patch:
 *          summary: 인증 완료하기
 *          tags: [tokens]
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  myphone:
 *                                      type: string
 *                                      example: "01012356789"
 *                                  mytoken:
 *                                      type: string
 *                                      example: 153254
 *          responses:
 *              200:
 *                  description: 성공
 */
