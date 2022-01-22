import { NextFunction, Request, Response } from 'express';
import { IResponse } from '../interfaces/response';

const handler = async (_ctx: Request, res: Response, next: () => void) => {
  const resToSend: IResponse = {
    meta: {
      status: res.statusCode,
      message: res.statusMessage || 'Success',
    },
    data: res['data'],
  };
  res.status(res.statusCode || 200).json(resToSend);
  await next();
};

export default () => handler;
