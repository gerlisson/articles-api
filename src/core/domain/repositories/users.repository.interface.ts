import { User } from '../entities/user.entity';
import { CreateUserDto } from '../../../modules/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../modules/users/dto/update-user.dto';

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDto): Promise<User>;
  update(id: string, data: UpdateUserDto): Promise<User>;
  remove(id: string): Promise<void>;
}
