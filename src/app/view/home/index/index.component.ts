import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cliente } from "../../models/ficha";
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
  masonryImages;
  limit = 16;

  constructor(
    private homeService: HomeService,
    public messageService: MessageService
  ) { }
  onScrollDown() {
    this.limit += 15;
    this.masonryImages = this.clientes.slice(0, this.limit);
    console.log('scrolled down!!')
  }
  onScrollUp() {
    console.log('scrolled up!!')
  }

  ngOnInit() {
    this.list = this.homeService.getAnuncio();
    console.log(this.messageService);
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

    this.masonryImages = this.clientes.slice(0, this.limit);
    
    console.log(this.clientesbean);
  }


}



/*
    template: `
  <header class="hero">
    <div class="hero-body has-text-centered">
      <h1 class="title"> Welcome to {{title}} </h1>
      <h2 class="subtitle"> Version: {{subtitle}} </h2>
      <a target="_blank" rel="noopener" href="https://academia-binaria.com/">
        <img width="100" src="./assets/logo.png">
      </a>
    </div>
  </header>
  <aside class="menu">
    <p class="menu-label">
      Cars in your garage
    </p>
    <ul class="menu-list">
      <li><a [routerLink]="['/car', 'Model S']">Model S</a></li>
      <li><a [routerLink]="['/car', 'Model X']">Model X</a></li>
      <li><a [routerLink]="['/car', 'Model 3']">Model 3</a></li>
      <li><a [routerLink]="['/car', 'Roadster']">Roadster</a></li>
    </ul>
  </aside>
  `,
*/