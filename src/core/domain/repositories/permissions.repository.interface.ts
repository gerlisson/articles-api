import { Permission } from '../entities/permission.entity';

export interface IPermissionsRepository {
  findAll(): Promise<Permission[]>;
  findById(id: string): Promise<Permission | null>;
  findByName(name: string): Promise<Permission | null>;
  create(name: string, description?: string): Promise<Permission>;
  remove(id: string): Promise<void>;
}
