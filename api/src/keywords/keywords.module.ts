import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsResolver } from './keywords.resolver';

@Module({
  providers: [KeywordsService, KeywordsResolver],
  exports: [KeywordsService]
})
export class KeywordsModule {}
