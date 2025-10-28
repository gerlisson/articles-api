import { Inject, Injectable } from '@nestjs/common';
import type { IArticlesRepository } from '../../core/domain/repositories/articles.repository.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from '../../core/domain/entities/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject('IArticlesRepository')
    private readonly articlesRepository: IArticlesRepository,
  ) {}

  findAll() {
    return this.articlesRepository.findAll();
  }

  findOne(id: string) {
    return this.articlesRepository.findById(id);
  }

  create(dto: CreateArticleDto, author: User) {
    return this.articlesRepository.create(dto, author);
  }

  update(id: string, dto: UpdateArticleDto) {
    return this.articlesRepository.update(id, dto);
  }

  remove(id: string) {
    return this.articlesRepository.remove(id);
  }
}
