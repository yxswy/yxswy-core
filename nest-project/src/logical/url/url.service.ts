import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './url.entity';

interface Item {
  title: string;
  url: string;
  type: '';
  tag: string[];
}

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
  ) {}

  findAll() {
    return this.urlRepository.find();
  }

  create(item: Item) {
    return this.urlRepository.insert({
      ...item,
      tag: item.tag.join(','),
    });
  }
}
