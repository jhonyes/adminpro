import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle( token: string ) {
    let url = `${ URL_SERVICIOS }/login/google`;

    return this.http.post( url, { token })
          .pipe( map((resp: any) => {
            this.guardarStorage( resp.id, resp.token, resp.usuario );
            return true;
          }));
  }

  login( usuario: Usuario, recordar: boolean = false ) {
    let url = `${ URL_SERVICIOS }/login`;

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post( url, usuario )
        .pipe( map( (resp: any) => {
          this.guardarStorage( resp.id, resp.token, resp.usuario );
          return true;
        }));
  }

  logOut() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  crearUsuario( usuario: Usuario) {
    let url = `${ URL_SERVICIOS }/usuario`;

    return this.http.post( url, usuario )
        .pipe( map( (resp: any) => {
          Swal.fire('Usuario creado', usuario.email, 'success');
          return resp.usuario;
        }));
  }

  actualizarUsuario( usuario: Usuario ) {
    // let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    const url = `${ URL_SERVICIOS }/usuario/${ usuario._id }?token=${ this.token }`;

    return this.http.put( url, usuario )
        .pipe(map( (resp: any) => {
          let usuarioDB = resp.usuario;

          this.guardarStorage( usuarioDB._id, this.token, usuarioDB );

          Swal.fire('Usuario actualizado', usuario.nombre, 'success');

          return true;
        }));
  }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( (resp: any) => {
          this.usuario.img = resp.usuario.img;

          this.guardarStorage( id, this.token, this.usuario );

          Swal.fire('Imagen Actualizada', this.usuario.nombre, 'success');
        })
        .catch( resp => {
          console.log(resp);
        });
  }
}
