import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  totalHospitales: number = 0;

  constructor(
              public http: HttpClient,
              public _usuarioService: UsuarioService
  ) { }

  cargarHospitales( desde: number = 0 ) {
    let url = `${ URL_SERVICIOS }/hospital?desde=${ desde }`;

    return this.http.get( url )
              .pipe(map((resp: any) => {
                  this.totalHospitales = resp.total;
                  return resp.hospitales;
                }
              ));
  }

  obtenerHospital( id: string ) {
    let url = `${ URL_SERVICIOS }/hospital/${ id }`;

    return this.http.get(url)
              .pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital( id: string ) {
    let url = `${  URL_SERVICIOS }/hospital/${ id }?token=${ this._usuarioService.token }`;

    return this.http.delete( url )
              .pipe(map((resp: any) => {
                Swal.fire('Hospital borrado', `El hospital ${ resp.hospital.nombre } ha sido eliminado`, 'success');
              }));
  }

  crearHospital( nombre: string ) {
    let url = `${ URL_SERVICIOS }/hospital?token=${ this._usuarioService.token }`;

    return this.http.post( url, { nombre } )
              .pipe(map((resp: any) => {
                Swal.fire('Hospital creado', `El hospital ${ resp.hospital.nombre } se ha creado correctamente`, 'success');
                return resp.hospital;
              }));
  }

  buscarHospital( termino: string ) {
    const url = `${ URL_SERVICIOS }/busqueda/coleccion/hospitales/${ termino }`;

    return this.http.get( url )
              .pipe(map( (resp: any) => resp.hospitales));
  }

  actualizarHospital( hospital: Hospital ) {
    let url = `${ URL_SERVICIOS }/hospital/${ hospital._id }?token=${ this._usuarioService.token }`;

    return this.http.put( url, hospital )
              .pipe(map((resp: any) => {
                Swal.fire('Hospital actualizado', `El hospital ${ resp.hospital.nombre } ha sido actualizado`, 'success');
                return resp.hospital;
              }));
  }
}
