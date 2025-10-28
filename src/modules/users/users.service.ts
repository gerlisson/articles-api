import { Inject, Injectable } from '@nestjs/common';
import type { IUsersRepository } from '../../core/domain/repositories/users.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: string) {
    return this.usersRepository.findById(id);
  }

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  create(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }

  update(id: string, dto: UpdateUserDto) {
    return this.usersRepository.update(id, dto);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }
}
