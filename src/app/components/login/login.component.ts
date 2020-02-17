import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recuerdaUsuario = false;

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recuerdaUsuario = true;
    }
  }

  login(form: NgForm) {
    if (form.valid) {

      Swal.fire({
        allowOutsideClick: false,
        icon: "info",
        text: "Espere por favor..."
      })
      Swal.showLoading();

      this.auth.login(this.usuario)
        .subscribe((resp:any) => {

          Swal.close();

          if (resp.message) {

            Swal.fire({
              icon: "error",
              title: "Error al autenticar",
              text: resp.message
            })

          } else {

            if (this.recuerdaUsuario) {
              localStorage.setItem('email',this.usuario.email)
            }else{
              localStorage.removeItem('email');
            }

            this.router.navigateByUrl('/productos')

          }
          
        }, err => {
          console.log(err)

          Swal.fire({
            icon: "error",
            title: "Error",
            text: err
          })
        })
    }
  }

  volverInicio(){
    this.router.navigateByUrl('/inicio');
  }

}
