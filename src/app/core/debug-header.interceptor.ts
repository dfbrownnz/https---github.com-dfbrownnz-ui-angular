import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DebugHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timestamp = new Date().toISOString();
    
    console.group(`HTTP Request Details [${timestamp}]`);
    console.log(`URL: ${req.url}`);
    console.log(`Method: ${req.method}`);
    
    // Log headers in a readable format
    const headers: any = {};
    req.headers.keys().forEach(key => {
      headers[key] = req.headers.getAll(key);
    });
    
    console.log('Headers Sent:');
    console.table(headers);

    // Specifically check for content-type on PUT requests
    if (req.method === 'PUT' && !req.headers.has('Content-Type')) {
      console.warn('Warning: PUT request is missing Content-Type header.');
    }

    console.groupEnd();
    
    return next.handle(req);
  }
}