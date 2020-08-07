import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(
            public _usuarioService: UsuarioService,
            public router: Router
  ) {

  }
  canActivate() {
    if ( this._usuarioService.estaLogueado() ) {
      return true;
    }else {
      Swal.fire('Bloqueado','Debe loguearse primero', 'warning');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
