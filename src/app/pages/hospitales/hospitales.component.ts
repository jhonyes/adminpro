import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  desde: number = 0;

  constructor(
              public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUploadService.notificacion
            .subscribe( () => this.cargarHospitales() );
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if ( desde >= this._hospitalService.totalHospitales ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;

    this.cargarHospitales();
  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital( termino )
            .subscribe( hospitales => this.hospitales = hospitales );
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales( this.desde )
            .subscribe( hospitales => this.hospitales = hospitales );
  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
            .subscribe();
  }

  borrarHospital( hospital: Hospital) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está a punto de borrar a ${ hospital.nombre }`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(borrar => {

      if (borrar.isConfirmed) {
        this._hospitalService.borrarHospital( hospital._id )
              .subscribe( borrado => {
                this.desde = 0;
                this.cargarHospitales();
              });
      }
    });
  }

  crearHospital() {
    Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      icon: 'info',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      input: 'text'
    }).then( (valor: any) => {
      if ( valor.isConfirmed ) {
          if (!valor.value || String(valor.value).length === 0 ) {
            return;
          }
          this._hospitalService.crearHospital( valor.value )
                .subscribe( () => this.cargarHospitales() );
      }
    });
  }

  actualizarImagen( hospital: Hospital ) {
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }

}
