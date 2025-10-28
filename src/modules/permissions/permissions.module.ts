import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../../core/domain/entities/permission.entity';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PermissionsRepository } from '../../infra/database/typeorm/repositories/permissions.repository';
import { PermissionsSeed } from 'src/infra/database/typeorm/seeds/permissions.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    {
      provide: 'IPermissionsRepository',
      useClass: PermissionsRepository,
    },
    PermissionsSeed,
  ],
  exports: [PermissionsService],
})
export class PermissionsModule {}
