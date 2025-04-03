import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Advisor } from './schemas/advisor.schema';
import { Model } from 'mongoose';
import { CreateAdvisorDto } from './dto/create-advisor.dto';

@Injectable()
export class AdvisorService {
  constructor(
    @InjectModel(Advisor.name) private advisorModel: Model<Advisor>,
  ) {}

  async create(createAdvisorDto: CreateAdvisorDto): Promise<Advisor> {
    try {
      const createdAdvisor = new this.advisorModel(createAdvisorDto);

      return await createdAdvisor.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          'Theres already a advisor with this email',
        );
      }
      return Promise.reject(error as Error);
    }
  }

  async findAll(): Promise<Advisor[]> {
    return this.advisorModel.find().exec();
  }

  async findByEmail(email: string): Promise<Advisor> {
    const advisor = await this.advisorModel.findOne({ email });
    if (!advisor) {
      throw new Error('user not found');
    }

    return advisor;
  }

  async findById(id: string): Promise<Advisor> {
    const advisor = await this.advisorModel.findById(id);
    if (!advisor) {
      throw new Error('user not found');
    }

    return advisor;
  }
}
