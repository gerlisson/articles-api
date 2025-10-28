import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './core/domain/entities/user.entity';
import { Article } from './core/domain/entities/article.entity';
import { Permission } from './core/domain/entities/permission.entity';

import { UsersModule } from './modules/users/users.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { AuthModule } from './infra/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('DB_HOST'),
        port: cfg.get<number>('DB_PORT'),
        username: cfg.get<string>('DB_USERNAME'),
        password: cfg.get<string>('DB_PASSWORD'),
        database: cfg.get<string>('DB_DATABASE'),
        entities: [User, Article, Permission],
        synchronize: true,
        logging: false,
      }),
    }),

    UsersModule,
    ArticlesModule,
    PermissionsModule,
    AuthModule,
  ],
})
export class AppModule {}
