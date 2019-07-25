import { Component } from '@angular/core';
import { MoviesService } from '../services/movies-service.service';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  ideas: string[] = [
    'spiderman',
      'batman',
      'superman',
  ];

  peliculas: Pelicula[] = [];

  buscando = false;

  constructor( private moviesService: MoviesService,
               private modalController: ModalController) {}


  buscar(event) {
    const valor: string = event.detail.value;
    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;
    this.moviesService.buscarPelicula(valor)
    .subscribe((resp: RespuestaMDB) => {
      this.peliculas = resp.results;
      this.buscando = false;
    });


  }

  // buscarIdeas(idea){
  //   this.textoBuscar=idea;
  //   console.log(idea)
  // }
  //  esto es lo mismo a
  // (click)="textoBuscar=idea"



    async detalle(id: number) {
      const modal = await this.modalController.create({
        component: DetalleComponent,
        componentProps: {
          id
        }
      });
      modal.present();
    }
  




}
