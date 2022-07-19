import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    state: RouterStateSnapshot) {
     return this.usuarioService.validarToken()
     .pipe(
       tap(estaAutenticado=>{
         if(!estaAutenticado){
           this.router.navigateByUrl('/login');
         }
       })
     );
  }
  
}
