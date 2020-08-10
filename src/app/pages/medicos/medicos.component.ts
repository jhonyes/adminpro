import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  desde: number = 0;
  medicos: Medico[] = [];



  constructor(
              public _medicosService: MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosService.cargarMedicos( this.desde )
            .subscribe( medicos => this.medicos = medicos );
  }

  buscarMedico( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this._medicosService.buscarMedicos( termino )
            .subscribe( medicos => this.medicos = medicos );
  }

  crearMedico() {

  }

  editalMedico( medico: Medico ) {

  }

  borrarMedico( medico: Medico ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está a punto de borrar a ${ medico.nombre }`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(borrar => {

      if (borrar.isConfirmed) {
        this._medicosService.borrarMedico( medico._id )
              .subscribe( borrado => {
                this.desde = 0;
                this.cargarMedicos();
              });
      }
    });
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if ( desde >= this._medicosService.totalMedicos ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;

    this.cargarMedicos();
  }

}
