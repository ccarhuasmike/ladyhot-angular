import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  schema:{}; 
  constructor(private location: Location) { }

  generarJsonSchemaMovie(anuncios: any){
    console.log(this.location);
    let esquemaProducto: any;
    let itemsProducto: Array<any> = [];
    let hostname= this.location["_platformStrategy"]._platformLocation.location.origin;
    if(anuncios != null){
      let itemProducto: any;
      let index = 1;
      anuncios.map((item)=>{
          itemProducto = {
            "@type": "ListItem",
            "position": index,
            "item": {
              "@type": "Movie",
              "url": hostname+"/kinesiologas/"+item["id"],
              "name": item["txt_nombre_ficha"],
              "image": item["txt_imagen_prensetancion"],//"https://fileserver.gologolos.com/uploads_fichas/2211/55_c4ef0.jpg",
              "dateCreated": "2018-10-05",
              "director": {
                  "@type": "Person",
                  "name": item["txt_nombre_ficha"]
                },
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "GoloGolos"
                },
                "reviewBody": item["txt_presentacion"]
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "90",
                  "bestRating": "100",
                  "ratingCount": "19141"
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