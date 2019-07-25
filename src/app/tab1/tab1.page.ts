import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies-service.service';
import { RespuestaMDB, Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // slideOpts={
  //   slidePreview:1.1,
  //   freeMode:true
  // }


  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor(private moviesService: MoviesService) {}


  ngOnInit() {
   this.moviesService.getFeatured()
   .subscribe((resp   ) => {
     this.peliculasRecientes = resp.results;
   });

   this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares()
   .subscribe((resp   ) => {

    const arrTemp = [... this.populares, ...resp.results];

     this.populares=arrTemp;
   });
  }

  cargarMas() {
    this.getPopulares();
  }



}
