import { CustomResponse } from 'domains/suporte/entities/custom.response';
import { Router, Request, Response, NextFunction } from 'express'

const router = Router();

router.get('/v1',
  (_request: Request, _response: Response, next: NextFunction) => {
    return next(new CustomResponse(200, 'OK', null));
  });


export default router;
