import { environment } from './../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

const url = 'https://image.tmdb.org/t/p';// environment.url;


@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {


  transform(img: string, size: string= 'w500'): string {

    if (!img) {
      return './assets/no-image-banner.jpg' ;
    }

    const imgUrl = `${url}/${size}${img}`;

    return imgUrl;
  }

}
