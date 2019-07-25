import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies-service.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: any[] = [];

  favoritoPorGen: any[] = [
    
  ];

  constructor(private dataLocalService: DataLocalService,
              private moviesService: MoviesService) {}


 


  async ionViewWillEnter(){// se dispara cada vez que la pagina se va a llamar
    this.peliculas = await this.dataLocalService.cargarFavoritosStorage();
    this. generos = await this.moviesService.cargarGeneros();


    this.pelisPorGenero(this.generos, this.peliculas);

  }


  pelisPorGenero(generos: Genre[] , peliculas: PeliculaDetalle[] ) {
    this.favoritoPorGen=[];

    

    generos.forEach(genero=>{
      this.favoritoPorGen.push({ 
        genero:genero.name,
        pelis:peliculas.filter(peli=>{  //filter regresa todos los elementos que cumplen la condicion
          return peli.genres.find(genre=> genre.id===genero.id)
      })
    })
     
    })
  }

  async regreso(){
    await this.ionViewWillEnter();
  }

}
