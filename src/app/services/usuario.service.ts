import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { cargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router) { }

  logout(){
    //pendiente borrar menu
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
 
  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }
  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }

  }

  validarToken(): Observable<boolean>{
    
    return this.http.get(`${ base_url }/login/renew`, {
      headers:{
        'x-token': this.token
      }
    }).pipe(
      map((resp: any)=>{
        const {email,google,nombre,role, img = '', uid} = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        //this.usuario = imprimirUsuario();
        console.log(this.usuario.nombre);
        console.log(this.usuario.img);
        //localStorage.setItem('token', resp.token)
        return true;
      }),
      catchError(error=>of(false))
    );
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData)
                    .pipe(
                          tap( (resp: any) =>{
                               localStorage.setItem('token', resp.token);
                               localStorage.setItem('menu', JSON.stringify(resp.menu));
                             })
                         );
  }

  actualizarPerfil(data: {email: string, nombre: string, role: string }){
    data = {
      ...data,
      role: this.usuario.role
    };
    return this.http.put(`${base_url}/usuarios/${ this.uid }`, data, this.headers)

  }


  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
               .pipe(
                  tap( (resp: any) =>{
                    console.log(resp.token);
                    localStorage.setItem('token', resp.token);
                    localStorage.setItem('menu', JSON.stringify(resp.menu));
                  })
               );
  }

  cargarUsuarios(desde: number =0){
    /// http://localhost:3000/api/usuarios?desde=5
    const url=`${ base_url }/usuarios?desde=${desde}`;
    return this.http.get<cargarUsuario>(url, this.headers)
               .pipe(
                 delay(1000),
                 map( resp =>{
                  const usuarios = resp.usuarios.map( 
                        user=> new Usuario(user.nombre, user.email, '', user.img,  user.role, user.google, user.uid )
                  );
                  return {
                    total: resp.total,
                    usuarios
                  };
                
                 })
               )
  }

  eliminarUsuario(usuario:Usuario){
    const url=`${ base_url }/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers)
  }

  guardarUsuario(usuario: Usuario){
    /* data = {
      ...data,
      role: this.usuario.role
    }; */
    return this.http.put(`${base_url}/usuarios/${ usuario.uid}`, usuario, this.headers)

  }





}
