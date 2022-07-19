import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuario'|'medicos'|'hospitales'): string {
    if(!img){
      return `${ base_url }/upload/usuarios/no-image`;
     } else  if(img){
          return `${ base_url }/upload/${tipo}/${img}`;
      }else{
          return `${ base_url }/upload/usuarios/no-image`;
      }
  }

}
