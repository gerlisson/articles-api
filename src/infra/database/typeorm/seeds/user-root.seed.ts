import { Injectable, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import type { IUsersRepository } from '../../../../core/domain/repositories/users.repository.interface';
import { Role } from '../../../../common/enums/role.enum';

@Injectable()
export class UserRootSeed implements OnApplicationBootstrap {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    private readonly config: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const email = this.config.get<string>('ROOT_EMAIL') ?? 'admin@admin.com';
    const name = this.config.get<string>('ROOT_NAME') ?? 'Admin';
    const passwordPlain = this.config.get<string>('ROOT_PASSWORD') ?? '123456';

    const existing = await this.usersRepository.findByEmail(email);
    if (existing) return;

    const password = await bcrypt.hash(passwordPlain, 10);
    await this.usersRepository.create({
      name,
      email,
      password,
      role: Role.Admin,
    });

    console.log('Usuário root criado:', email);
  }
}
