import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { Brand } from 'src/typeorm/entities/brands';

@Module({
  imports: [TypeOrmModule.forFeature([User, Brand])],
  exports: [],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
