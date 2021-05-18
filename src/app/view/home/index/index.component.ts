import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { NgxMasonryOptions } from 'ngx-masonry';
import { HomeService } from "../../../shared/services/anuncio/home.services";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SeoService } from 'src/app/shared/services/seo/seo.service';
import { ParameterService } from "../../../shared/services/anuncio/parameter.service";
import { DetalleAnuncioComponent } from '../../componentes-reusable/detalle-anuncio/detalle-anuncio.component';
import { SEOFacebookService } from 'src/app/shared/services/seofacebook/seofacebook.service';
@Component({
  selector: 'app-home',
  templateUrl: "./index.component.html",
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  modalRef: BsModalRef;
  listSchemas = [];
  public status: boolean = false;
  @ViewChild('resultadomasonry') resultadomasonry: ElementRef;
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '2.0s',
    gutter: 5
  };
  list: any;
  public title = 'autobot';
  masonryImages: any;
  limit = 16;

  constructor(
    private homeService: HomeService,
    private modalService: BsModalService,
    private seoService: SeoService,
    private parameter: ParameterService,
    private renderer: Renderer2,
    private seoFacebookService: SEOFacebookService
  ) {


    /*Revisar este link 
    https://www.ngdevelop.tech/dynamically-add-title-and-meta-tags-on-route-change-in-angular/ 
    https://www.positronx.io/angular-seo-set-dynamic-page-title-meta-tags-in-universal-app/
    */

    /*
    Encuentra Kinesiólogas y putas de lujo en peru con fotos verificadas y vídeos. Profesionales del sexo en Lima, Ven, Valencia y demás provincias.
    */
    this.seoFacebookService.updateTitle("Kinesiólogas en Perú | Gologolos");
    this.seoFacebookService.updateContentTitle("Kinesiólogas en Perú | Gologolos");    
    this.seoFacebookService.updateDescripcion("Encuentra mejores scorts y putas disponibles para pasar el rato, disfrutas de momentos agradables con putas venezolanas, peruanas, colombiandas y ecuatorianas.");
    this.seoFacebookService.updateCanonicalUrl("https://gologolos.com/#/");
    this.seoFacebookService.updateOgUrl("https://gologolos.com/#/");
    this.seoFacebookService.updateOgType("article");
    this.seoFacebookService.updateOgTitle("Gologolos")
    this.seoFacebookService.updateOgDescription("Bienvenidos a Gologolos, guía de señoritas en Peruanas, Venezolanas, Colombianas, Ecuatorias y en toda SudAmerica" +
      "Nuestro objetivo como siempre es garantizar un experiencia al usuario de alta calidad donde todo el contenido esté trabajado al detalle y satisfacer así a los paladares más exquisitos" +
      "Tratamos de mantener nuestro prestigio día a día para seguir siendo un portal referencia de anuncios de acompañantes de lujo.");
    this.seoFacebookService.updateOgImage("https://www.record.com.mx/sites/default/files/galerias/2017/05/11/chica_110517.jpg")
  }
  onScrollDown() {

    this.limit += 15;
    this.masonryImages = this.list.slice(this.limit - 15, this.limit);
    this.generarItemAnuncio(this.masonryImages);
  }
  onScrollUp() {
  }
  getLisAnuncios(filtrer: boolean = false, entidadFiltro: any = {}) {
    if (filtrer) {
      this.masonryImages = this.list.filter(function (e) {
        return e.txt_nombre_ficha.toLowerCase().indexOf(entidadFiltro.txt_nombre_ficha.toLowerCase()) > -1 ||
          e.txt_lugar_servicio_distrito.indexOf(entidadFiltro.txt_lugar_servicio_distrito) ||
          e.tx_servicios_ofrece.indexOf(entidadFiltro.tx_servicios_ofrece) ||
          e.tx_lugar_atencion.indexOf(entidadFiltro.tx_lugar_atencion)
      }).slice(0, this.limit);
      this.generarItemAnuncio(this.masonryImages);
      let shema = this.seoService.generarJsonSchemaMovie(this.masonryImages.slice(0, 10));
      this.listSchemas.push(shema);
    } else {
      this.homeService.getAnuncio().subscribe(
        (res: ClientResponse) => {
          this.list = JSON.parse(res.DataJson);
          this.masonryImages = this.list.slice(0, this.limit);
          this.generarItemAnuncio(this.masonryImages);
          let shema = this.seoService.generarJsonSchemaMovie(this.masonryImages.slice(0, 10));
          this.listSchemas.push(shema);
        },
        (error) => {
          console.log(error + "getLisAnuncios");
        }
      );
    }
  }
  ngOnInit() {
    this.getLisAnuncios();
    //https://developers.facebook.com/tools/debug
    //https://developers.facebook.com/docs/sharing/webmasters
    /*
    <meta property="og:url" content="https://gologolos.com/#/" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="Gologolos" />
    <meta property="og:description" content="Bienvenidos a Gologolos, guía de señoritas en Peruanas, Venezolanas, Colombianas, Ecuatorias y en toda SudAmerica.
    Nuestro objetivo como siempre es garantizar un experiencia al usuario de alta calidad donde todo el contenido esté trabajado al detalle y satisfacer así a los paladares más exquisitos.
    Tratamos de mantener nuestro prestigio día a día para seguir siendo un portal referencia de anuncios de acompañantes de lujo." />
    <meta property="og:image" content="https://www.record.com.mx/sites/default/files/galerias/2017/05/11/chica_110517.jpg" />
    */
    // this.seoFacebookService.updateCanonicalUrl("https://gologolos.com/#/");
    // this.seoFacebookService.updateOgUrl("https://gologolos.com/#/");
    // this.seoFacebookService.updateOgType("article");
    // this.seoFacebookService.updateOgTitle("Gologolos")
    // this.seoFacebookService.updateOgDescription("Bienvenidos a Gologolos, guía de señoritas en Peruanas, Venezolanas, Colombianas, Ecuatorias y en toda SudAmerica" +
    //   "Nuestro objetivo como siempre es garantizar un experiencia al usuario de alta calidad donde todo el contenido esté trabajado al detalle y satisfacer así a los paladares más exquisitos" +
    //   "Tratamos de mantener nuestro prestigio día a día para seguir siendo un portal referencia de anuncios de acompañantes de lujo.");
    // this.seoFacebookService.updateOgImage("https://www.record.com.mx/sites/default/files/galerias/2017/05/11/chica_110517.jpg")


  }
  generarItemAnuncio(list): void {
    
    list.forEach(element => {
      // var html1 = `
      //   <div class ='item cursor-pointer'>
      //     <img src="${element.txt_imagen_prensetancion}" alt="${element.txt_nombre_ficha}" style="width: 100%; height: 400px;">              
      //     <div class="icons-fichas w-10">
      //         <span class="icons-fichas-info text-white line-h-2">
      //             <span class="fa fa-info"></span>
      //         </span>
      //     </div>
      //     <a href="#" class="btn-small">${element.txt_nombre_ficha}</a>
      //     <a href="#" class="btn-small">${element.tx_pais_origen}</a>
      //     <a href="#" class="btn-small"> ${element.int_edad} Años</a>
      //     <p class="block-ellipse-descripcion">
      //     ${element.txt_presentacion}
      //     </p>
      // </div>`;
      // 
      // this.myHtml = this.myHtml + html1;

      const divitem = this.renderer.createElement('div');
      divitem.className = "item cursor-pointer";
      divitem.addEventListener('click', this.openModalDetalleAnuncio.bind(this, element.id, this.modalService));

      const img = this.renderer.createElement('img');
      img.src = element.txt_imagen_prensetancion;
      img.alt = element.txt_nombre_ficha;
      divitem.appendChild(img);

      const diviconos = this.renderer.createElement('div');
      diviconos.className = "icons-fichas w-10";

      const diviconos_span = this.renderer.createElement('span');
      diviconos_span.className = "icons-fichas-info text-white line-h-2";
      diviconos.appendChild(diviconos_span);

      const diviconos_span_span = this.renderer.createElement('span');
      diviconos_span_span.className = "fa fa-info";
      diviconos_span.appendChild(diviconos_span_span);

      divitem.appendChild(diviconos);

      /*
      <div class="icons-fichas w-10">
          <span class="icons-fichas-info text-white line-h-2">
              <span class="fa fa-info"></span>
          </span>
      </div>
      */

      const primer_a = this.renderer.createElement('a');
      primer_a.className = "btn-small";
      primer_a.innerHTML = element.txt_nombre_ficha;
      divitem.appendChild(primer_a);

      const segundo_a = this.renderer.createElement('a');
      segundo_a.className = "btn-small";
      segundo_a.innerHTML = element.tx_pais_origen;
      divitem.appendChild(segundo_a);

      const tercero_a = this.renderer.createElement('a');
      tercero_a.className = "btn-small";
      tercero_a.innerHTML = element.int_edad + " Años";
      divitem.appendChild(tercero_a);

      const parrafodescripcion = this.renderer.createElement('p');
      parrafodescripcion.className = "block-ellipse-descripcion";
      parrafodescripcion.innerHTML = element.txt_presentacion;
      divitem.appendChild(parrafodescripcion);

      this.renderer.appendChild(this.resultadomasonry.nativeElement, divitem)
    });
  }
  RecepcionarFiltro(event): void {
    this.getLisAnuncios(true, event.entidad);
  }
  openModalDetalleAnuncio(id: number, modalService: any) {

    this.modalRef = modalService.show(DetalleAnuncioComponent, {
      animated: true,
      //backdrop: 'static',
      class: 'modal-lg',
      initialState: {
        title: '',
        data: {
          id: id,
          mostrarBotonCloseModal: true
        }
      }
    });
  }
}