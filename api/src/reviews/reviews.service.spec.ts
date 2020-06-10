import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';

describe('ReviewsService', () => {
    let service: ReviewsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReviewsService],
        }).compile();

        service = module.get<ReviewsService>(ReviewsService);
        await new Promise(resolve => setTimeout(resolve, 3000));
    });

    it("check find all", async () => {
        const reviews = service.findAll()
        expect(reviews.length).toEqual(6203);
    })

    it("check find id", async () => {
        const review = service.findById("2");
        expect(review)
        .toEqual({
            "reviewID": "2",
            "review": "สั่งไป2 เมนู คือมัชฉะลาเต้ร้อน กับ ไอศครีมชาเขียว มัชฉะลาเต้ร้อน รสชาเขียวเข้มข้น หอม มัน แต่ไม่กลมกล่อม มันจืดแบบจืดสนิท ส่วนไอศครีมชาเขียว ทานแล้วรสมันออกใบไม้ๆมากกว่าชาเขียว แล้วก็หวานไป โดยรวมแล้วเฉยมากก ดีแค่รสชาเขียวเข้ม มีน้ำเปล่าบริการฟรี",
            "version": 0
        });
    })

    it("check find id -> not found", async () => {
        const review = service.findById("999999999");
        expect(review)
            .toEqual(undefined);
    })

    it("check find keyword", async () => {
        const reviews = service.findByKeyword("เผ็ดกลา");
        expect(reviews.length)
            .toEqual(12);
    })

    it("check find keyword", async () => {
        const reviews = service.findByKeyword("ไอติมมันม่วง");
        expect(reviews.length).toEqual(1);
        const review = reviews.pop();
        expect(review.review).toEqual("Brown cafe มาออกบู๊ตที่เซ็นทรัลเฟสติวัล ของ Fin market เลยมาลองทาน<keyword>ไอติมมันม่วง</keyword>ตามกระแสค่ะ ต้องบอกว่าร้านนี้ถือเป็นร้านยอดฮิตเลย เพราะคนเยอะมาก ต้องเอาคิวด้วย ได้ทานแล้วก็อร่อยดี ราคาถ้วยละ 89 บาท ???? เมนูเครื่องดื่มก็มีคนสั่งเยอะ");
        expect(review.version).toEqual(0);
    })

    it("check find keyword -> not found", async () => {
        const review = service.findByKeyword("999999999");
        expect(review).toEqual([]);
    })



    it("check edit -> id not match", async () => {
        expect(() => service.editReviewById("1asdsad", "1234", 0))
            .toThrowError("can not find this id;1asdsad")
    })


    it("check edit -> version match", async () => {
        expect(() => service.editReviewById("1", "1234", 1))
            .toThrowError("version not match")
    })


    it("check edit", async () => {
        const review = service.editReviewById("1", "1234", 0)
        expect(review.review).toEqual("1234")
        expect(review.version).toEqual(1)
    })


});
