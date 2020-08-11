import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  // menu: any = [
  //   {
  //   titulo: 'Principal',
  //   icono: 'mdi mdi-arrow-right-bold-circle',
  //   submenu: [
  //     { titulo: 'Dashboard', url: '/dashboard' },
  //     { titulo: 'ProgressBar', url: '/progress' },
  //     { titulo: 'Gráfcas', url: '/graficas1' },
  //     { titulo: 'Promesas', url: '/promesas' },
  //     { titulo: 'RxJs', url: '/rxjs' }
  //   ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Médicos', url: '/medicos' }
  //     ]
  //   }
  // ];

  constructor(
              public _usuarioService: UsuarioService
  ) {

  }

  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }
}
