import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];
  cargando = false;
  categorias: any[] = [];
  categoria:string;

  constructor( private _productosService:ProductosService, 
               private _auth:AuthService,
               private router:Router ) { }

  ngOnInit() {
    this.cargando = true;
    this.getCategorias();
    this.obtenerProductos();
  }

  borrarProducto( prod ){

    Swal.fire({
      title:'Atención',
      text:`Está seguro que desea borrar a ${prod.nombre}..?`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then( resp  => {
      if (resp.value) {
        this._productosService.eliminarProducto(prod._id)
        .subscribe( resp => {
          this.obtenerProductos()
        });
      }
    });
  }

  obtenerProductos(){
    this._productosService.getProductos()
    .subscribe((data: any[]) => {
      this.productos = data;
      this.cargando = false;
    }, (err) => {
      console.log(err)
    });
  }

  filtrarCategoria(){

    if (this.categoria == 'todos' || this.categoria == null) {
      this.obtenerProductos();
    } else {
      this._productosService.getProdXCategoria(this.categoria)
        .subscribe((data:any) => {
          this.productos = data;
        }, (err) => {
          console.log(err)
        });
    }
  }

  getCategorias() {
    //obtengo las categorías de la api
    this._productosService.getCategorias()
      .subscribe((data: any[]) => {
        this.categorias = data;
      }, (err) => {
        console.log(err)
      });
  }

  cerrarSesion(){
    this._auth.logout();
    this.router.navigateByUrl('login');
  }
}
