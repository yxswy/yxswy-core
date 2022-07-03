import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlService } from './url.service';
import { UrlEntity } from './url.entity';
import { UrlController } from './url.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity])],
  providers: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}
