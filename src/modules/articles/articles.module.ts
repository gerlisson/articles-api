import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../../core/domain/entities/article.entity';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticlesRepository } from '../../infra/database/typeorm/repositories/articles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    {
      provide: 'IArticlesRepository',
      useClass: ArticlesRepository,
    },
  ],
  exports: [ArticlesService],
})
export class ArticlesModule {}
