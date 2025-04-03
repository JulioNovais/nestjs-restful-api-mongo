import { Module } from '@nestjs/common';
import { AdvisorController } from './advisor.controller';
import { AdvisorService } from './advisor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Advisor, AdvisorSchema } from './schemas/advisor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Advisor.name, schema: AdvisorSchema }]),
  ],
  controllers: [AdvisorController],
  providers: [AdvisorService],
  exports: [AdvisorService],
})
export class AdvisorModule {}
