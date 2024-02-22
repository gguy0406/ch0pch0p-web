import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from 'environments/environment';

@Injectable()
export class ApiBaseUrlInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({ url: request.url.startsWith('/') ? `${API_BASE_URL}${request.url}` : request.url })
    );
  }
}
