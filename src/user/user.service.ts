import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { WhereOptions, FindOptions } from 'sequelize/types/model';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProjectError } from '../common/filters/all-exceptions.filter';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  public async findById(id: string): Promise<Nullable<User>> {
    return this.userModel.findByPk(id);
  }

  public async findAll(where: WhereOptions, options: FindOptions = {}): Promise<Array<User>> {
    return this.userModel.findAll({ where, ...options });
  }

  public async create(data: Partial<User>): Promise<User> {
    return this.userModel.create({ ...data });
  }

  public async updateUserById(userId: string, updatedData: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new ProjectError(1003);
    await user.update(updatedData);
    return user;
  }

  public async deleteUserById(userId: string) {
    return this.userModel.destroy({ where: { id: userId } });
  }
}
