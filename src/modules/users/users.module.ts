import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../core/domain/entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from '../../infra/database/typeorm/repositories/users.repository';
import { UserRootSeed } from 'src/infra/database/typeorm/seeds/user-root.seed';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
    UserRootSeed,
  ],
  exports: [UsersService, 'IUsersRepository'],
})
export class UsersModule {}
