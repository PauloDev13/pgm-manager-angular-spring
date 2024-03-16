import { HttpInterceptorFn } from '@angular/common/http';

export const loaderSpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
