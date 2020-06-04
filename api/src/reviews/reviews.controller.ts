import { Controller, Get, Param, Query, Put } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from "./interfaces/review.interface";

@Controller('reviews')
export class ReviewsController {

    constructor(private reviewsService:ReviewsService) { }

    @Get(':id')
    getReviewById(@Param('id') id: Number): Review {
        return this.reviewsService.findById(id);
    }

    @Get()
    getReviews(@Query('query') query): Review[] {
        return this.reviewsService.findByKeyword(query).map(obj => ({
            reviewID: obj.reviewID,
            review: obj.review.replace(new RegExp(query, 'g'), `<keyword>${query}</keyword>`)
        }));
    }


    @Put(':id')
    editReviewById(@Param('id') id: String): String {
        console.log("PJ-LOG: ReviewsController -> id", id)
        const strings = [
            'halo',
            'world',
            id,
        ];
        return strings.join(' ');
    }


}
