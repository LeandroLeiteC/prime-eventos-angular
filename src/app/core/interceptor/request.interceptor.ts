import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from './../token/token.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    
    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        
        if(this.tokenService.hasToken() && !req.url.startsWith('//viacep.com.br/ws/')){
            const token = this.tokenService.getToken();
            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }

        return next.handle(req);
    }
}