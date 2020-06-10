import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Review {
  @Field(type => String)
  reviewID: string;

  @Field(type => String)
  review: string;

  @Field(type => Int, { nullable: true })
  version?: number;
}