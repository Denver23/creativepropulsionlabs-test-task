import { buildErrorResponseFromError } from '../responseBuilder';

export const UnauthorizedExample = {
  description: 'Unauthorized',
  content: {
    'application/json': {
      example: buildErrorResponseFromError('error1002'),
    },
  },
};
export const ForbiddenExample = {
  description: 'Forbidden Resource',
  content: {
    'application/json': {
      example: buildErrorResponseFromError('error1001'),
    },
  },
};
