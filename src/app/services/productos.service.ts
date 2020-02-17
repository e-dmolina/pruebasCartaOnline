import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productoModel } from '../models/producto.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  URL = 'https://laesquinaelmejorsabor.com/api';
  URL_DEV = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getProductos() {
    return this.http.get(`${this.URL_DEV}/productos`);
  }

  getPoducto(id: string) {
    return this.http.get(`${this.URL_DEV}/productos/${id}`)
  }

  getProdXCategoria(categoria:string){
    return this.http.get(`${this.URL_DEV}/productos/categoria/${categoria}`)
  }

  crearProducto(producto: productoModel) {
    return this.http.post(`${this.URL_DEV}/productos`, producto)
      .pipe(
        map((resp: any) => {
          producto = resp;
          return producto;
        })
      );
  }

  actualizarProducto(producto: productoModel) {
    return this.http.put(`${this.URL_DEV}/productos/${producto.id}`, producto)
  }

  eliminarProducto(id:string){
    return this.http.delete(`${this.URL_DEV}/productos/${id}`)
  }

  getCategorias() {
    return this.http.get(`${this.URL_DEV}/productos/categorias`);
  }
}
