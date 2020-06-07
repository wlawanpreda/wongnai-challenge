import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Review {
  @Field(type => Int)
  reviewID: number;

  @Field(type => String)
  review: string;

  @Field(type => Int, { nullable: true })
  version?: number;
}