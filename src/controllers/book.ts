import { Request, Response, NextFunction } from 'express';
import { Inject } from '../di/injectable/inject';
import { Injectable } from '../di/injectable/injectable';
import { container } from '../di/container/container';
import { BookService } from '../services/bookService';
import { IBookRequest } from '../interfaces';
import { formatError } from '../middlewares';

@Injectable('BookController')
class BookController {
  @Inject('BookService') private bookService: BookService;

  // tslint:disable-next-line: no-empty
  constructor() {}

  public get = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res['data'] = await this.bookService.getAll();
      await next();
    } catch (err) {
      // since express doesn't support async error via middleware, so we are formatting error
      const error = formatError(err);
      res.status(error.status || 500).json(error);
      await next();
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: IBookRequest = {
        name: req.body.name,
      };
      res['data'] = await this.bookService.create(payload);
      await next();
    } catch (err) {
      // since express doesn't support async error via middleware, so we are formatting error
      const error = formatError(err);
      res.status(error.status || 500).json(error);
      await next();
    }
  };

  public remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res['data'] = await this.bookService.remove(+req.params.id);
      await next();
    } catch (err) {
      // since express doesn't support async error via middleware, so we are formatting error
      const error = formatError(err);
      res.status(error.status || 500).json(error);
      await next();
    }
  };
}
container.resolve('BookController');

export default BookController;
