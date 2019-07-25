import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { ParesPipe } from './pares.pipe';
import { FiltroImagenPipe } from './filtro-imagen.pipe';

@NgModule({
  declarations: [ImagePipe, ParesPipe, FiltroImagenPipe],
  imports: [
    CommonModule
  ],
  exports:[
    ImagePipe,
    ParesPipe,
    FiltroImagenPipe
  ]
})
export class PipesModule { }
