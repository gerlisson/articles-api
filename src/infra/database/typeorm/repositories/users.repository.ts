import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUsersRepository } from '../../../../core/domain/repositories/users.repository.interface';
import { User } from '../../../../core/domain/entities/user.entity';
import { CreateUserDto } from '../../../../modules/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../../modules/users/dto/update-user.dto';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly ormRepo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.ormRepo.find();
  }

  findById(id: string): Promise<User | null> {
    return this.ormRepo.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.ormRepo.findOne({ where: { email } });
  }

  async create(data: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(data.password, 10);
    const user = this.ormRepo.create({ ...data, password });
    return this.ormRepo.save(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new Error('User not found');

    const patch: UpdateUserDto = { ...data };

    if (patch.password) {
      patch.password = await bcrypt.hash(patch.password, 10);
    }

    Object.assign(user, patch);
    return this.ormRepo.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
