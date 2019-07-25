import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween:-10,
    stretch: 0,
  };

  @Input()peliculasRecientes: Pelicula[] = [];

  // 

  @Output()cargarMas=new EventEmitter();

  constructor(private modalContoller : ModalController) { }

  ngOnInit() {}

  cargar(){
    this.cargarMas.emit();
  }

  async verDetalle(id:number){
    const modal = await this.modalContoller.create({
      component:DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }

}
