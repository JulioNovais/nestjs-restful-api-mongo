import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateAdvisorDto } from './dto/create-advisor.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { createAdvisorSchema } from './dto/create-advisor.zod-schema';
import { AdvisorService } from './advisor.service';
import { Advisor } from './schemas/advisor.schema';
import { AuthGuard } from '../auth/auth.guard';

@Controller('advisor')
export class AdvisorController {
  constructor(private advisorService: AdvisorService) {}

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return 'request advisor with #ID:' + id;
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.advisorService.findAll();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createAdvisorSchema))
  create(@Body() request: CreateAdvisorDto): Promise<Advisor> {
    return this.advisorService.create(request);
  }
}
