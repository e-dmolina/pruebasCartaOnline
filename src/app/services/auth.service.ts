import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/api/login';
  userToken:string;

  constructor( private http:HttpClient ) {

    this.leerToken();

   }

  login(usuario: UsuarioModel){

    const authData = {
      ...usuario      
    }

    return this.http.post(this.url, authData)
              .pipe(
                map(resp => {
                  this.guardarToken(resp['token']);
                  return resp;
                })
              );

  }

  private guardarToken( idToken:string ){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }

  leerToken(){

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;

  }

  estaAutenticado():boolean{
    return this.userToken.length > 2;
  }

  logout(){
    this.userToken = ''
    localStorage.removeItem('token');
  }
}
