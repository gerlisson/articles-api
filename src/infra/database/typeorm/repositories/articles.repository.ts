import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IArticlesRepository } from '../../../../core/domain/repositories/articles.repository.interface';
import { Article } from '../../../../core/domain/entities/article.entity';
import { CreateArticleDto } from '../../../../modules/articles/dto/create-article.dto';
import { UpdateArticleDto } from '../../../../modules/articles/dto/update-article.dto';
import { User } from '../../../../core/domain/entities/user.entity';

@Injectable()
export class ArticlesRepository implements IArticlesRepository {
  constructor(
    @InjectRepository(Article)
    private readonly ormRepo: Repository<Article>,
  ) {}

  findAll(): Promise<Article[]> {
    return this.ormRepo.find({ relations: ['author'] });
  }

  findById(id: string): Promise<Article | null> {
    return this.ormRepo.findOne({ where: { id }, relations: ['author'] });
  }

  async create(data: CreateArticleDto, author: User): Promise<Article> {
    const article = this.ormRepo.create({ ...data, author });
    return this.ormRepo.save(article);
  }

  async update(id: string, data: UpdateArticleDto): Promise<Article> {
    const article = await this.findById(id);
    if (!article) throw new NotFoundException('Article not found');
    Object.assign(article, data);
    return this.ormRepo.save(article);
  }

  async remove(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
