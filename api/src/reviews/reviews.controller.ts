import { Controller, Get, Param, Query, Body, Put } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from "./interfaces/review.interface";

@Controller('reviews')
export class ReviewsController {

    constructor(private reviewsService:ReviewsService) { }

    @Get(':id')
    getReviewById(@Param('id') id: number): Review {
        return this.reviewsService.findById(id);
    }

    @Get()
    getReviews(
        @Query('query') query: string,
    ): Review[] {

        // check query math keyword
        return this.reviewsService.findByKeyword(query)
    }

    // how to check consistent state ??
    @Put(':id')
    editReviewById(
        @Param('id') id: number,
        @Body('review') review: string,
        @Body('version') version: number
    ): Review {
        return this.reviewsService.editReviewById(id, review, version);
    }


}
