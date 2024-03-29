import { Controller, Get, Param, Query, Body, Put, BadRequestException, UseFilters } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from "./interfaces/review.interface";
import { KeywordsService } from '../keywords/keywords.service';

@Controller('reviews')
export class ReviewsController {

    constructor(
        private reviewsService: ReviewsService,
        private keywordsService: KeywordsService
    ) { }

    @Get(':id')
    getReviewById(@Param('id') id: string): Review {
        const result = this.reviewsService.findById(id);
        if(!result) 
            throw new BadRequestException("id not match!");

        return result;
    }

    @Get()
    getReviews(
        @Query('query') query: string,
    ): Review[] {
        if(!this.keywordsService.vaild(query))
            throw new BadRequestException("keyword not match!");

        return this.reviewsService.findByKeyword(query)
    }

    @Put(':id')
    editReviewById(
        @Param('id') id: string,
        @Body('review') review: string,
        @Body('version') version: number
    ): Review {
        return this.reviewsService.editReviewById(id, review, version);
    }


}
