import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../src/infra/auth/auth.service';
import { IUsersRepository } from '../src/core/domain/repositories/users.repository.interface';
import { Role } from '../src/common/enums/role.enum';

describe('AuthService', () => {
  let service: AuthService;
  let mockRepo: jest.Mocked<IUsersRepository>;
  let jwtService: JwtService;

  beforeEach(async () => {
    mockRepo = {
      findByEmail: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: 'IUsersRepository',
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve validar usuário com credenciais corretas', async () => {
    const user = {
      id: '1',
      email: 'john@site.com',
      password: await bcrypt.hash('123456', 10),
      role: Role.Admin,
    };
    mockRepo.findByEmail.mockResolvedValue(user);

    const result = await service.validateUser('john@site.com', '123456');
    expect(result.email).toBe('john@site.com');
  });

  it('deve lançar erro se a senha for inválida', async () => {
    const user = {
      id: '1',
      email: 'john@site.com',
      password: await bcrypt.hash('123456', 10),
      role: Role.Admin,
    };
    mockRepo.findByEmail.mockResolvedValue(user);

    await expect(
      service.validateUser('john@site.com', 'wrong'),
    ).rejects.toThrow('Invalid credentials');
  });
});
