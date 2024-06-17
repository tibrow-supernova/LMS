import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/typeorm/entities/brands';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  exports: [],
  providers: [BrandService],
  controllers: [BrandController]
})
export class BrandModule {}
