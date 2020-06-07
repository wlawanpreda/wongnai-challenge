import { Query, Mutation, Subscription, Resolver, Args } from '@nestjs/graphql';
import { Review } from "./model/reviews.model";
import { ReviewsService } from './reviews.service';

@Resolver('Reviews')
export class ReviewsResolver {

    constructor(private reviewsService: ReviewsService) { }

    @Query(returns => [Review])
    reviews(): Review[] {
        return this.reviewsService.findAll();
    }
    @Query(returns => [Number])
    edit(): Number[] {
        return this.reviewsService.getEditing();
    }

    // how to set timeout per once edit
    @Mutation(returns => Boolean)
    reserveEdit(@Args('id') id: number) {
        return this.reviewsService.reserveEdit(id);
    }

    @Mutation(returns => Review)
    editReview(
        @Args('id') id: number,
        @Args('review') review: string,
        @Args('version') version: number
    ) {
        return this.reviewsService.editReviewById(id, review, version);
    }

    @Subscription(returns => [Number])
    editing() {
        return this.reviewsService.pubSub.asyncIterator(['editing']);
    }
    
}
