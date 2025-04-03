import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvisorModule } from './modules/advisor/advisor.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    AdvisorModule,
    AuthModule,

    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_KEY as string),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
