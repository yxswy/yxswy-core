import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { CodeModule } from './logical/code/code.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path'

@Module({
  imports: [
    UserModule,
    CodeModule,
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "root",
      "database": "20210908",
      "entities": [join(__dirname, '**', '*.entity.{ts,js}')],
      "synchronize": true 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
