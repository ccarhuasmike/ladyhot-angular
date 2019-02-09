import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AnuncioService } from 'src/app/shared/services/service.module';
import { ConfigService } from 'src/app/shared/services/Utilitarios/config.service';
import { ClientResponseResult } from 'src/app/Models/ClientResponseModels';
import { Tbl_anuncio } from 'src/app/Models/Tbl_anuncioModels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-misanuncios',
  templateUrl: './misanuncios.component.html',
  styleUrls: ['./misanuncios.component.css']
})
export class MisAnunciosComponent implements OnInit {

  _baseUrl: string = '';
  listaMisAnuncios: any;
  anuncioSelected: Tbl_anuncio;

  constructor(
    private router: Router,
    private anuncioService: AnuncioService,
    private configService: ConfigService) { 
      this._baseUrl = configService.getWebApiURL();
    }

  ngOnInit() {
    
    this.anuncioService.getListarMisAnuncios().subscribe(
      (res: ClientResponseResult<any>) => {
        this.listaMisAnuncios = res.result;
      }
    );
  }

  editarMiAnuncio(anuncio:Tbl_anuncio){
    
    this.anuncioSelected = anuncio;
    this.router.navigate(["/DashboardAnuncion/misanuncios/editar", this.anuncioSelected.id]);
  }

}
