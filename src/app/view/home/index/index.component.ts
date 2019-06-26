import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cliente } from "../../models/ficha";
import { Tbl_anuncio } from "../../../Models/Tbl_anuncioModels";


import { ClientResponse } from '../../../Models/ClientResponseModels';
import { NgxMasonryOptions } from 'ngx-masonry';
import { HomeService } from "../../../shared/services/anuncio/home.services";
import { MessageService } from "../../../throwError/message.service";
@Component({
  selector: 'app-home',
  templateUrl: "./index.component.html",
  styleUrls: ['./index.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {

  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '2.0s',
    gutter: 5
  };

  list: any;

  public title = 'autobot';
  clientes: Cliente[] = [];
  clientesbean: Cliente;
  masonryImages  :any [];
  limit = 16;

  constructor(
    private homeService: HomeService,
    public messageService: MessageService
  ) { }
  onScrollDown() {
    // this.limit += 15;
    // this.masonryImages = this.clientes.slice(0, this.limit);
    console.log('scrolled down!!')
  }
  onScrollUp() {
    console.log('scrolled up!!')
  }



  getProducts() {
    this.homeService.getAnuncio().subscribe(
      (res: ClientResponse) => {     
        debugger;   
        this.list = JSON.parse(res.DataJson);
        this.masonryImages = this.list.slice(0, this.limit);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  ngOnInit() {
    this.getProducts();    
    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/13.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/2.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);
    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/3.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);
    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/3.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);
    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/3.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);
    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/3.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);
    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/3.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);
    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/3.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);
    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/3.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);
    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/3.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);
    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/3.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);
    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/3.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);
    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/3.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/4.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/5.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/6.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/7.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/8.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);


    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/9.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);



    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/10.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);


    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/11.png',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/12.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/11.png',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/12.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/11.png',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/12.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/11.png',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/12.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/11.png',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/12.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/11.png',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/12.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/11.png',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/12.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);


    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/13.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);


    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/13.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

    this.clientesbean = {
      descripcion: 'Back in 2011, when Pinterest was just launched, I myself tried creating its lookalike with plain CSS. I started off by using float and vertical-align properties on my inline-block elements (it sounds silly now). It didn’t help.',
      distrito: 'Los Olivos',
      foto: 'assets/13.jpg',
      edad: "25 años",
      pais: "Peru",
      precio: "S/ 120"
    };
    this.clientes.push(this.clientesbean);

   // debugger;
  //  this.masonryImages = this.clientes.slice(0, this.limit);

    console.log(this.clientesbean);
  }


}

