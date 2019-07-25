import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, Pelicula, PeliculaDetalle, RespuestaCredits } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';




const url = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPages = 0;

  populares: Pelicula[] = [];

  generos: any[] = [];

  constructor(private httpClient: HttpClient) { }

  private ejecutarQuery<t>(query: string) {
    query = url + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es;`;

    return this.httpClient.get<t>(query);

  }

  getPopulares() {
    this.popularesPages++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPages}`;

    return this.ejecutarQuery< RespuestaMDB>(query);

  }

  getFeatured() {

    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();

    const mes = hoy.getMonth() + 1;

    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB >(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }


  async getPeliculDetalle(id: string) {
    const peli= await this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);

    return new Promise((resolve)=>{

      peli.subscribe(resp=>{
        resolve(resp);
      })

      
    })

  }


  getActores(id: string) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }


  buscarPelicula(texto: string) {
    return this.ejecutarQuery(`/search/movie?query=${texto}`);
  }


  cargarGeneros():Promise<any[]> {   //devuelve explicitamente una promesa de tipo any[]

    return new Promise(resolve=>{
      this.ejecutarQuery(`/genre/movie/list?a=1`)
          .subscribe(resp => {
              this.generos = resp['genres'];
              resolve(this.generos);         //la promesa se resuelve aqui
          });

    });
    
    // Promise  permite devolver este observable como una promesa
  }

}
