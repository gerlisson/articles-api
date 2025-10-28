import { Injectable, OnApplicationBootstrap, Inject } from '@nestjs/common';
import type { IPermissionsRepository } from '../../../../core/domain/repositories/permissions.repository.interface';
import { Role } from '../../../../common/enums/role.enum';

@Injectable()
export class PermissionsSeed implements OnApplicationBootstrap {
  constructor(
    @Inject('IPermissionsRepository')
    private readonly repo: IPermissionsRepository,
  ) {}

  async onApplicationBootstrap() {
    const roles = [
      { name: Role.Admin, description: 'Full access to users and articles' },
      { name: Role.Editor, description: 'Can create and edit articles' },
      { name: Role.Reader, description: 'Can read articles only' },
    ];

    for (const role of roles) {
      const exists = await this.repo.findByName(role.name);
      if (!exists) await this.repo.create(role.name, role.description);
    }
  }
}
