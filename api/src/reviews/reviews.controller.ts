import { Controller, Get, Param, Query, Put } from '@nestjs/common';

@Controller('reviews')
export class ReviewsController {

    @Get(':id')
    getReviewById(@Param('id') id: String): String {
        console.log("PJ-LOG: ReviewsController -> id", id)
        const strings = [
            'halo',
            'world',
            id,
        ];
        return strings.join(' ');
    }

    @Get()
    getReviews(@Query('query') query): String[] {
        console.log("PJ-LOG: ReviewsController -> query", query)
        const strings = [
            'halo',
            'world',
            query,
        ];
        return strings;
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
