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
    @Query(returns => [String])
    edit(): String[] {
        return this.reviewsService.getEditing();
    }

    // how to set timeout per once edit
    @Mutation(returns => Boolean)
    reserveEdit(@Args('id') id: string) {
        return this.reviewsService.reserveEdit(id);
    }

    @Mutation(returns => Review)
    editReview(
        @Args('id') id: string,
        @Args('review') review: string,
        @Args('version') version: number
    ) {
        return this.reviewsService.editReviewById(id, review, version);
    }

    @Subscription(returns => [String])
    editing() {
        return this.reviewsService.pubSub.asyncIterator(['editing']);
    }
    
}
