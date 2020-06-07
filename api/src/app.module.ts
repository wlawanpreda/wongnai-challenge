import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewsModule } from './reviews/reviews.module';
import { GraphQLModule } from "@nestjs/graphql";
import { KeywordsModule } from './keywords/keywords.module';

@Module({
  imports: [
    ReviewsModule,
    GraphQLModule.forRoot({ 
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
      formatError: err => {
        console.log("PJ-LOG: err", err)
        throw err
      },
    }),
    KeywordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
