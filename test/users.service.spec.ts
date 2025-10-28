import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/modules/users/users.service';
import { IUsersRepository } from '../src/core/domain/repositories/users.repository.interface';
import { Role } from '../src/common/enums/role.enum';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepo: jest.Mocked<IUsersRepository>;

  beforeEach(async () => {
    mockRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'IUsersRepository',
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('deve criar um novo usuário', async () => {
    const dto = {
      name: 'John',
      email: 'john@site.com',
      password: '123456',
      role: Role.Editor,
    };
    mockRepo.create.mockResolvedValue({ id: '1', ...dto });

    const result = await service.create(dto);

    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(result.email).toBe('john@site.com');
  });

  it('deve buscar todos os usuários', async () => {
    mockRepo.findAll.mockResolvedValue([
      {
        id: '1',
        name: 'John',
        email: 'john@site.com',
        password: 'x',
        role: Role.Admin,
      },
    ]);
    const result = await service.findAll();
    expect(result).toHaveLength(1);
  });
});
