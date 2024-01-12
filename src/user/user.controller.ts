import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseBuilder, sendSuccess } from '../common/responseBuilder';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProjectError } from '../common/filters/all-exceptions.filter';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'This should register new user',
    description: 'This is for registration the new user requires name and email',
  })
  @ApiCreatedResponse({
    description: 'Created',
    content: {
      'application/json': {
        example: sendSuccess({ email: 'test@email.com', name: 'test name', id: 'uuid' }),
      },
    },
  })
  @Post('')
  @ResponseBuilder(HttpStatus.CREATED)
  public async createUser(@Req() req, @Body() newUser: CreateUserDto) {
    const user: User = await this.userService.create(newUser);
    return user;
  }

  @ApiOperation({
    summary: 'This should return list of all users',
    description: 'This is return full info about all users in one array',
  })
  @ApiOkResponse({
    description: 'Ok',
    content: {
      'application/json': {
        example: sendSuccess([{ email: 'test@email.com', name: 'test name', id: 'uuid' }]),
      },
    },
  })
  @Get('')
  @ResponseBuilder(HttpStatus.OK)
  public async getUsers(@Req() req) {
    const users: Array<User> = await this.userService.findAll({});
    return users;
  }

  @ApiOperation({
    summary: 'This should return one user by id',
    description: 'This is return full info about one user',
  })
  @ApiOkResponse({
    description: 'Ok',
    content: {
      'application/json': {
        example: sendSuccess({ email: 'test@email.com', name: 'test name', id: 'uuid' }),
      },
    },
  })
  @Get('/:userId')
  @ResponseBuilder(HttpStatus.OK)
  public async getUserById(@Req() req, @Param('userId') userId: string) {
    const user: User = await this.userService.findById(userId);
    if (!user) throw new ProjectError(1003);
    return user;
  }

  @ApiOperation({
    summary: 'This should return updated user',
    description: 'This is return updated user',
  })
  @ApiOkResponse({
    description: 'Ok',
    content: {
      'application/json': {
        example: sendSuccess({ email: 'test@email.com', name: 'test name', id: 'uuid' }),
      },
    },
  })
  @Put('/:userId')
  @ResponseBuilder(HttpStatus.OK)
  public async updateUserById(@Req() req, @Param('userId') userId: string, @Body() body: UpdateUserDto) {
    const user: User = await this.userService.updateUserById(userId, body);
    return user;
  }

  @ApiOperation({
    summary: 'This should delete user by id',
  })
  @ApiOkResponse({
    description: 'Deleted',
    content: {
      'application/json': {
        example: sendSuccess({ email: 'test@email.com', name: 'test name', id: 'uuid' }),
      },
    },
  })
  @Delete('/:userId')
  @ResponseBuilder(HttpStatus.OK)
  public async deleteUserById(@Req() req, @Param('userId') userId: string) {
    const response: number = await this.userService.deleteUserById(userId);
    if (response === 0) throw new ProjectError(1003);
    return null;
  }
}
