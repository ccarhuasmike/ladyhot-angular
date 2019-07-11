import { Component, OnInit } from '@angular/core';
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { NgxMasonryOptions } from 'ngx-masonry';
import { HomeService } from "../../../shared/services/anuncio/home.services";
@Component({
  selector: 'app-content',
  templateUrl: "./content.component.html",
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '2.0s',
    gutter: 5
  };

  list: any;
  public title = 'autobot';  
  masonryImages  :any;
  limit = 16;  
  constructor(
    private homeService: HomeService
  ) { }
 
  showPueblo(event): void {
    alert(event.nombre);
  }

  onScrollDown() {
    this.limit += 15;
    this.masonryImages = this.list.slice(0, this.limit);
    console.log('scrolled down!!')
  }
  onScrollUp() {
    console.log('scrolled up!!')
  }
  getLisAnuncios() {
    this.homeService.getAnuncio().subscribe(
      (res: ClientResponse) => {             
         this.list = JSON.parse(res.DataJson);
         this.masonryImages = this.list.slice(0, this.limit);             
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
     this.getLisAnuncios();       
  }
}

