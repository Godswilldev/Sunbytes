import { Request, Response } from "express";
import { HttpStatus } from "@nestjs/common/enums";
import { UnauthorizedException } from "@nestjs/common";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from "@nestjs/common";

@Catch()
export class GlobalErrorHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.CONFLICT;

    const cause = exception.cause;
    const name = exception.name;
    const message = exception.message;

    if (process.env.NODE_ENV === "production") {
      const errObj = {
        statusCode: httpStatus,
        [exception instanceof BadRequestException || exception instanceof UnauthorizedException
          ? "error"
          : ""]: exception instanceof BadRequestException ? exception["response"]["message"] : "",
      };

      console.log({
        ...errObj,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
        cause,
        name,
      });

      return response.status(httpStatus).json(errObj);
    } else {
      const errObj = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
        cause,
        name,

        [exception instanceof BadRequestException || exception instanceof UnauthorizedException
          ? "error"
          : ""]: exception instanceof BadRequestException ? exception["response"]["message"] : "",
      };

      console.log(errObj);
      return response.status(httpStatus).json(errObj);
    }
  }
}
