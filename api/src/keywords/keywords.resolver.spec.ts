import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsResolver } from './keywords.resolver';

describe('KeywordsResolver', () => {
  let resolver: KeywordsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeywordsResolver],
    }).compile();

    resolver = module.get<KeywordsResolver>(KeywordsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
