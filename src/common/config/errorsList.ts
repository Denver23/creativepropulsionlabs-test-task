import { HttpStatus } from '@nestjs/common';

export interface IDefaultError {
  message: string;
  code: number;
  status: HttpStatus;
}

export const errorsList: Record<string, IDefaultError> = {
  error1000: {
    message: 'The next error was caught:',
    code: 1000,
    status: HttpStatus.BAD_REQUEST,
  },
  error1001: {
    message: 'Forbbiden',
    code: 1001,
    status: HttpStatus.FORBIDDEN,
  },
  error1002: {
    message: 'Unauthorized',
    code: 1002,
    status: HttpStatus.UNAUTHORIZED,
  },
  error1003: {
    message: 'User not found',
    code: 1003,
    status: HttpStatus.NOT_FOUND,
  },
};
