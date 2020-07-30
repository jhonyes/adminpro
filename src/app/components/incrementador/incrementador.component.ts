import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }
  onChanges( newValue: number ) {
    // const elementoHTML: any = document.getElementsByName('progreso')[0];


    if ( newValue >= 100 ) {
      this.progreso = 100;
    }else if ( newValue <= 0 ) {
      this.progreso = 0;
    }else{
       this.progreso = newValue;
    }

    // elementoHTML.value = Number(this.progreso);
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso);
  }

  cambiarValor( valor: number ) {

    if ( (this.progreso + valor) > 100 ) {
      this.progreso = 100;
      return;
    }
    if ( (this.progreso + valor) < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso += valor;

    this.cambioValor.emit( this.progreso);

    this.txtProgress.nativeElement.focus();
  }

}
