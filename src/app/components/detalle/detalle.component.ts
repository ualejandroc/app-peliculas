import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies-service.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle={};
  oculto = 150;

  actores: Cast[] = [];

  optActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };


  estrella = 'star-outline';

  constructor(private moviesService: MoviesService,
              private modalController: ModalController,
              private dataLocalService: DataLocalService
              ) {


               }

  async ngOnInit() {


    await this.moviesService.getPeliculDetalle(this.id)
      .then((resp: any) => {
          this.pelicula = resp;
          console.log(resp);
      });

    // const existe =await this.dataLocalService.existePelicula(this.id);
       // en la version anterior se asignaba a una variable,
       // se puede usar como una promesa normal
       // y toda la logica iria dentro del .then({})
    this.dataLocalService.existePeliculaStar(this.id)
          .then( existe => this.estrella = (existe) ? 'star' : 'star-outline');






    this.moviesService.getActores(this.id)
      .subscribe(resp => {
          this.actores = resp.cast;
      });

  }

  regresar() {
      this.modalController.dismiss();
      if (location.href.indexOf('tab3')>=0)
      {location.reload();}
     
  }


    favoritos() {
      const existe = this.dataLocalService.guardarPelicula(this.pelicula);

      this.estrella = (existe) ? 'star' : 'star-outline';

    }

}
