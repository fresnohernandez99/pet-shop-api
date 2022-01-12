import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopRepository } from './shop.repoistory';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopRepository]),
		AuthModule,
  ],
  providers: [ShopService],
  controllers: [ShopController]
})
export class ShopModule {}