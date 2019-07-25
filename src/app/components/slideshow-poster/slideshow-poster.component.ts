import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };

  @Input()peliculasRecientes: Pelicula[] = [];


  constructor(private modalContoller : ModalController) { }

  ngOnInit() {}

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
