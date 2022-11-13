import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(
    private _spinnerService: SpinnerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._spinnerService.showSpinner();
    return next.handle(req).pipe(
      finalize(() =>
        setTimeout(() => {
          this._spinnerService.hideSpinner()
        }, 500)
      )
    );
  }
}