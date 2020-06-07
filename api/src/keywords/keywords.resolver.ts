import { Resolver, Query, Args } from '@nestjs/graphql';
import { KeywordsService } from './keywords.service';

@Resolver('Keywords')
export class KeywordsResolver {

    constructor(private keywordsService: KeywordsService) { }

    @Query(returns => [String])
    keywords(@Args('query', { nullable: true }) query: string): string[] {
        return this.keywordsService.findAll(query);
    }

}
