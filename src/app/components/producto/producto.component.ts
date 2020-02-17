import { Component, OnInit } from '@angular/core';
import { productoModel } from 'src/app/models/producto.model';
import { NgForm } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  id = this.route.snapshot.paramMap.get('id');

  producto = new productoModel();
  categorias: any[] = [];


  constructor(private _productosService: ProductosService,
                      private route: ActivatedRoute) { }

  ngOnInit() {

    if (this.id !== 'nuevo') {
      this._productosService.getPoducto(this.id)
          .subscribe( (resp: productoModel) => {
            console.log(resp)
            this.producto = resp;
            this.producto.id = this.id;
          })
    } else {
      
    }

    this.getCategorias();
  }

  guardar(form: NgForm) {

    //si el formulario es válido
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    //si el id(parametro de ruta) es diferente a nuevo actualizo, sino creo un producto nuevo
    if (this.id !== 'nuevo') {
      peticion = this._productosService.actualizarProducto(this.producto)
    } else {
      peticion = this._productosService.crearProducto(this.producto)
    }

    peticion.subscribe((resp) => {
      console.log(resp);
      this.producto.id = resp._id;

      if (this.id == 'nuevo') {
        Swal.fire({
          title: this.producto.nombre,
          text: 'El producto se creó correctamente',
          icon: 'success'
        });
        form.reset();
      }else{
        Swal.fire({
          title: this.producto.nombre,
          text: 'El producto se actualizó correctamente',
          icon: 'success'
        });
      }

    }, err => {
      console.log(err)
    });


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

}
