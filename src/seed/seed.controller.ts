import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags } from '@nestjs/swagger';


@Controller('seed')
export class SeedController {

  
  constructor(private readonly seedService: SeedService) {}


@ApiTags('Seed')
  @Get()
  executedSeed() {
    return this.seedService.runSeed();
  }


}
