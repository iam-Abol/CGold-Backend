import { Test, TestingModule } from '@nestjs/testing';
import { PriceSchedulerService } from './price-scheduler.service';

describe('PriceSchedulerService', () => {
  let service: PriceSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceSchedulerService],
    }).compile();

    service = module.get<PriceSchedulerService>(PriceSchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
