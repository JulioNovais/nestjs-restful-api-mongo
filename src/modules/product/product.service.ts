import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import mongoose, { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { AdvisorService } from '../advisor/advisor.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private modalProduct: Model<Product>,
    private advisorService: AdvisorService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const advisor = await this.advisorService.findById(
      createProductDto.advisorId,
    );

    if (!advisor) {
      throw new NotFoundException('Advisor not found');
    }

    try {
      const product = new this.modalProduct(createProductDto);
      return product.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findAllProductsByAdvisorId(advisorId: string) {
    return this.modalProduct.find({ advisorId }).exec();
  }
}
