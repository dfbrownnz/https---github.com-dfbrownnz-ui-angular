import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = error.error?.message || 'Server Error: Failed to update project list';
      
      // Show red error toast
      snackBar.open(message, 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'] // Add custom CSS for red background
      });

      return throwError(() => error);
    })
  );
  // return next(req).pipe(
  //   catchError((error: HttpErrorResponse) => {
  //     let errorMessage = 'An unknown error occurred!';

  //     if (error.error instanceof ErrorEvent) {
  //       // Client-side or network error
  //       errorMessage = `Error: ${error.error.message}`;
  //     } else {
  //       // Backend returned an unsuccessful response code
  //       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //     }

  //     // You can inject a Toast/SnackBar service here to show a popup
  //     console.error(errorMessage);
      
  //     // Return the error so TanStack Query's isError() still works
  //     return throwError(() => new Error(errorMessage));
  //   })
  // );
};