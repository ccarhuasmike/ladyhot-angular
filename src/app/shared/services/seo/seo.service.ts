import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ConfigService } from '../Utilitarios/config.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private location: Location,
    private configService: ConfigService) { }

  generarJsonSchemaMovie(anuncios: any){
    
    let esquemaProducto: any;
    let itemsProducto: Array<any> = [];
    //let hostname= this.location["_platformStrategy"]._platformLocation.location.origin;
    if(anuncios != null){
      let itemProducto: any;
      let index = 1;
      anuncios.map((item)=>{
        let titulo = item.txt_titulo.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        titulo = titulo.replaceAll(' ','-');
        let departamento = item.departamento.replaceAll(' ','-');
        let provincia = item.provincia.replaceAll(' ','-');
          itemProducto = {
            "@type": "ListItem",
            "position": index,
            "item": {
              "@type": "Movie",
              "url": this.configService.getWebDomainURL()+"kinesiologas/"+departamento+"/"+provincia+"/"+titulo+"-"+item["id"],
              "name": item["txt_nombre_ficha"]+' '+ item["txt_telefono_1"]+', '+item["txt_titulo"],
              "image": item["txt_imagen_prensetancion"],
              "director": {
                  "@type": "Person",
                  "name": item["txt_nombre_ficha"]
                },
                "countryOfOrigin": {
                  "@type": "Country",
                  "name": item["tx_pais_origen"]
                }
              }
            };
          index++;
        itemsProducto.push(itemProducto);
      });
    }

    esquemaProducto =     {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": itemsProducto
    };
    return esquemaProducto;
  }
}