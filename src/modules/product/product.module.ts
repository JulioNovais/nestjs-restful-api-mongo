import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { AdvisorModule } from '../advisor/advisor.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AdvisorModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
