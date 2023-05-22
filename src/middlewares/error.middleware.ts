import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      errors: [
        {
          code: statusCode,
          message: 'Algo deu errado :-(',
        },
      ],
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;
      console.log({ exceptionResponse });

      errorResponse.errors[0].code = exceptionResponse.code || statusCode;
      errorResponse.errors[0].message = exceptionResponse.message;
    }

    response.status(statusCode).json(errorResponse);
  }
}
