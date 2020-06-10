import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsResolver } from './reviews.resolver';
import { KeywordsModule } from '../keywords/keywords.module';

@Module({
  providers: [ReviewsService, ReviewsResolver],
  controllers: [ReviewsController],
  imports: [KeywordsModule]
})
export class ReviewsModule {}
