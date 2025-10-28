import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../../../modules/articles/dto/create-article.dto';
import { UpdateArticleDto } from '../../../modules/articles/dto/update-article.dto';
import { User } from '../entities/user.entity';

export interface IArticlesRepository {
  findAll(): Promise<Article[]>;
  findById(id: string): Promise<Article | null>;
  create(data: CreateArticleDto, author: User): Promise<Article>;
  update(id: string, data: UpdateArticleDto): Promise<Article>;
  remove(id: string): Promise<void>;
}
