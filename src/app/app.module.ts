import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service'
import { NgModule } from '@angular/core';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ]
})
export class AppModule { }