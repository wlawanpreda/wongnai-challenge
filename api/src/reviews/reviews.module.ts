import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsResolver } from './reviews.resolver';

@Module({
  providers: [ReviewsService, ReviewsResolver],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
