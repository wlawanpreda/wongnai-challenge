import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsService } from './keywords.service';

describe('KeywordsService', () => {
    let service: KeywordsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [KeywordsService],
        }).compile();

        service = module.get<KeywordsService>(KeywordsService);
        await new Promise(resolve => setTimeout(resolve, 500));
    });

    it('check find all', async () => {
        const keywords = service.findAll(false);
        expect(keywords.length).toEqual(2000)
        expect(keywords[0]).toEqual("โรตีทุเรียน")
        expect(keywords.pop()).toEqual("กาบุรีไชน่า")
    });

    it('check find filter', async () => {
        const filterKeywords = service.findAll("เขียวหวานทะเล");
        expect(filterKeywords).toEqual(["เขียวหวานทะเลแห้ง"])
        expect(filterKeywords.length).toEqual(1)
    });

    it('check vaild', async () => {
        expect(service.vaild("12344321")).toEqual(false);
        expect(service.vaild("เขียวหวานทะเล")).toEqual(false);
        expect(service.vaild("เขียวหวานทะเลแห้ง")).toEqual(true);
        expect(service.vaild("coconut almond")).toEqual(true);
    });


});
