import { Query, Resolver, Subscription, Args } from '@nestjs/graphql';
import { Review } from "./model/reviews.model";
import { ReviewsService } from './reviews.service';

@Resolver('Reviews')
export class ReviewsResolver {

    constructor(private reviewsService: ReviewsService) { }

    @Query(returns => [Review])
    reviews(): Review[] {
        return this.reviewsService.findAll();
    }

    @Query(returns => Boolean)
    reserveEdit(@Args('id') id: number) {
        // check 

        //reserve
        return true;
    }

    @Subscription(returns => [String])
    editing() {
        return this.reviewsService.pubSub.asyncIterator('editing');
    }
    
}
