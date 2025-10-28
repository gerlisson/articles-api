import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPermissionsRepository } from '../../../../core/domain/repositories/permissions.repository.interface';
import { Permission } from '../../../../core/domain/entities/permission.entity';

@Injectable()
export class PermissionsRepository implements IPermissionsRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly ormRepo: Repository<Permission>,
  ) {}

  findAll(): Promise<Permission[]> {
    return this.ormRepo.find();
  }

  findById(id: string): Promise<Permission | null> {
    return this.ormRepo.findOne({ where: { id } });
  }

  findByName(name: string): Promise<Permission | null> {
    return this.ormRepo.findOne({ where: { name } });
  }

  async create(name: string, description?: string): Promise<Permission> {
    const permission = this.ormRepo.create({ name, description });
    return this.ormRepo.save(permission);
  }

  async remove(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
