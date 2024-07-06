/**
 * Model for represent common response data.
 */
export class CommonResponse<T> {
    statusCode: number;
    message: string;
    data?: T;
    errors?: any;
  }
  