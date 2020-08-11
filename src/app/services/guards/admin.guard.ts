import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
              public _usuarioService: UsuarioService
  ) {}
  canActivate() {
    if ( this._usuarioService.usuario.role === 'ADMIN_ROLE' ) {
      return true;
    } else {
      Swal.fire('Bloquedado', 'No tiene permiso de administrador', 'error');
      // this._usuarioService.logOut();
      return false;
    }
  }
}
