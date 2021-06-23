import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { HomeService } from "../../../shared/services/anuncio/home.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SeoService } from 'src/app/shared/services/seo/seo.service';
import { ParameterService } from "../../../shared/services/anuncio/parameter.service";
import { DetalleAnuncioComponent } from '../../componentes-reusable/detalle-anuncio/detalle-anuncio.component';
import { SEOFacebookService } from 'src/app/shared/services/seofacebook/seofacebook.service';
import { ConfigService } from 'src/app/shared/services/Utilitarios/config.service';
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';
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
  @ViewChild('resultadomasonry', { static: false }) resultadomasonry: ElementRef;

  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    percentPosition: true
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
    //private renderer: Renderer2,
    private seoFacebookService: SEOFacebookService,
    private configService: ConfigService
  ) {
    /*Revisar este link 
    https://www.ngdevelop.tech/dynamically-add-title-and-meta-tags-on-route-change-in-angular/ 
    https://www.positronx.io/angular-seo-set-dynamic-page-title-meta-tags-in-universal-app/
    */
    this.seoFacebookService.updateTitle("Kinesiólogas en Perú | Gologolos");
    this.seoFacebookService.updateContentTitle("Kinesiólogas en Perú | Gologolos");
    this.seoFacebookService.updateDescripcion("Encuentra mejores scorts y putas disponibles para pasar el rato, disfrutas de momentos agradables con putas venezolanas, peruanas, colombiandas y ecuatorianas.");
    this.seoFacebookService.updateCanonicalUrl("https://gologolos.com");
    this.seoFacebookService.updateOgUrl("https://gologolos.com");
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
  }
  onScrollUp() {
  }
  getLisAnuncios(filtrer: boolean = false, entidadFiltro: any = {}) {
    if (filtrer) {
      this.masonryImages = this.list.filter(function (e) {
        return e.txt_nombre_ficha.toLowerCase().indexOf(entidadFiltro.txt_nombre_ficha.toLowerCase()) > -1 
        //  ||
        //   e.txt_lugar_servicio_distrito.indexOf(entidadFiltro.txt_lugar_servicio_distrito) ||
        //   e.tx_servicios_ofrece.indexOf(entidadFiltro.tx_servicios_ofrece) ||
        //   e.tx_lugar_atencion.indexOf(entidadFiltro.tx_lugar_atencion) ||
        //   e.int_pais_origen.indexOf(entidadFiltro.cbo_pais_ficha)
      }).slice(0, this.limit);      
      //SCHEMA MOVIE
      let shema = this.seoService.generarJsonSchemaMovie(this.masonryImages.slice(0, 10));
      this.listSchemas.push(shema);
    } else {
      this.homeService.getAnuncio().subscribe(
        (res: ClientResponse) => {
          this.list = JSON.parse(res.DataJson);
          this.masonryImages = this.list.slice(0, this.limit);          
          //SCHEMA MOVIE
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
  }
  itemsLoaded() {
    console.log('itemsloaded');
  }
  showMoreImages() {
    this.limit += 15;
    this.masonryImages = this.list.slice(0, this.limit);
  }
 
  openNewTabDetalleAnuncio(element: any): void {
    debugger;
    let titulo = element.txt_titulo.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    titulo = titulo.replaceAll(' ', '-');
    let departamento = element.departamento.replaceAll(' ', '-');
    let provincia = element.provincia.replaceAll(' ', '-');
    var url = this.configService.getWebDomainURL() + 'kinesiologas/' + departamento + '/' + provincia + '/' + titulo + '-' + element.id;
    const newTab = window.open(url, '_blank')
    // set opener to null so that no one can references it
    newTab.opener = null
  }
  RecepcionarFiltro(event): void {
    this.getLisAnuncios(true, event.entidad);
  }
  openModalDetalleAnuncio(id: number) {
    this.modalRef = this.modalService.show(DetalleAnuncioComponent, {
      class: 'modal-lg',
      // backdrop: 'static',
      initialState: {
        // title: 'Actualizar Anuncio Demo',       
        data: {
          id: id,
          mostrarBotonCloseModal: true
        }
      }
    });

    // this.modalRef = this.modalService.show(DetalleAnuncioComponent, {
    //   animated: true,
    //   //backdrop: 'static',
    //   class: 'modal-lg mt-lg-0 mb-lg-0 m-xs-0',
    //   initialState: {
    //     title: '',
    //     data: {
    //       id: id,
    //       mostrarBotonCloseModal: true
    //     }
    //   }
    // });
  }
}