import { Inject, Injectable } from '@nestjs/common';
import type { IPermissionsRepository } from '../../core/domain/repositories/permissions.repository.interface';
import { Permission } from '../../core/domain/entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @Inject('IPermissionsRepository')
    private readonly permissionsRepository: IPermissionsRepository,
  ) {}

  findAll(): Promise<Permission[]> {
    return this.permissionsRepository.findAll();
  }

  findOne(id: string): Promise<Permission | null> {
    return this.permissionsRepository.findById(id);
  }

  create(name: string, description?: string): Promise<Permission> {
    return this.permissionsRepository.create(name, description);
  }

  remove(id: string): Promise<void> {
    return this.permissionsRepository.remove(id);
  }
}
