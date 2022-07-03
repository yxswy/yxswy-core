import { Body, Controller, Get, Post } from '@nestjs/common';
import { UrlService } from './url.service';

interface Item {
  title: string;
  url: string;
  type: '';
  tag: string[];
}

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get('/')
  findAll() {
    return this.urlService.findAll();
  }

  @Post('/create')
  create(@Body('data') body: Item) {
    return this.urlService.create(body);
  }
}
