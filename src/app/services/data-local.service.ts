import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = []; // este arreglo es el que se va a guardar en el storage.

  constructor(private storage: Storage,
              public toastController: ToastController) {
       this.cargarFavoritosStorage();  // esta funcio debe llamarse apenas se cargue el
                                  // para verificar si existen favoritos antes de
                                  // presentarles
      }


 async guardarPelicula(pelicula: PeliculaDetalle) {// pelicula detalle tiene toda la informacion

    let existe = false;
    let messagge = '';

    this.peliculas = [];

    await this.existePelicula(pelicula.id).then(resp => {
      existe = resp;
      console.log('funcion', existe);
      });

    console.log('pelis', this.peliculas);

    // for (const peli of this.peliculas) {
    //   if (peli.id === pelicula.id) {
    //     console.log('existe',this.peliculas)
    //     existe = true;
    //     break;
    //   }
    // }



    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id != pelicula.id);
      console.log(this.peliculas);
      messagge = 'Removido de favoritos';
    } else {

      this.peliculas.push(pelicula);
      messagge = 'Agregado a favoritos';
    }


    this.presentToast(messagge);
    this.storage.remove('peliculas');
    this.storage.clear();
    if (this.peliculas.length >= 1) {
      this.storage.set('peliculas', this.peliculas);
    }


    return !existe;

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  async cargarFavStorage() {

    const peliculas = await this.storage.get('peliculas');
    // esta funcion retorna una promesa por ello se usa async y await

    return peliculas || []; // si el arreglo es null, se carga un arreglo vacio

  }

  async cargarFavoritosStorage() {

    this.peliculas = [];

    const peliculas = await this.storage.get('peliculas');
    // esta funcion retorna una promesa por ello se usa async y await

    this.peliculas = peliculas || []; // si el arreglo es null, se carga un arreglo vacio
    return this.peliculas;
  }

  async existePelicula(id) {
    id = Number(id);

    this.peliculas = [];
    this.peliculas = await  this.cargarFavStorage();
    const existe =  this.peliculas.find(peli => peli.id == id);

    return (existe) ? true : false;  // si existe es un objeto regresa true

  }

  async existePeliculaStar(id) {
    id = Number(id);

    
    const peliculas = await  this.cargarFavStorage();
    const existe = peliculas.find(peli => peli.id == id);

    return (existe) ? true : false;  // si existe es un objeto regresa true

  }

}
