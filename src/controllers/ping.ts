import { Request, Response, NextFunction } from 'express';

class PingController {
  // tslint:disable-next-line: no-empty
  constructor() {}

  public get = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res['data'] = { message: 'Pong' };
    await next();
  };
}

export default PingController;
