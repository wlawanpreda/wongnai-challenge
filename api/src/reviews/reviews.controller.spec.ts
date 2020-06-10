import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { KeywordsModule } from '../keywords/keywords.module';

describe('Reviews Controller', () => {
    let controller: ReviewsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReviewsController],
            providers: [ReviewsService],
            imports: [KeywordsModule]
        }).compile();

        controller = module.get<ReviewsController>(ReviewsController);
    });


    it('get review by id', async () => {

        // console.log(controller.getReviewById(12))

        // const expectedResult = undefined;

        // jest.spyOn(clientService, "findOneById").mockResolvedValue(expectedResult);        // expect()
        //     .toBe({
        //         "reviewID": 2,
        //         "review": "สั่งไป2 เมนู คือมัชฉะลาเต้ร้อน กับ ไอศครีมชาเขียว มัชฉะลาเต้ร้อน รสชาเขียวเข้มข้น หอม มัน แต่ไม่กลมกล่อม มันจืดแบบจืดสนิท ส่วนไอศครีมชาเขียว ทานแล้วรสมันออกใบไม้ๆมากกว่าชาเขียว แล้วก็หวานไป โดยรวมแล้วเฉยมากก ดีแค่รสชาเขียวเข้ม มีน้ำเปล่าบริการฟรี",
        //         "version": 0
        //     });
    });


});
