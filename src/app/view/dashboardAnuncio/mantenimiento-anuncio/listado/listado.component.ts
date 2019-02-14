import { Component, OnInit } from '@angular/core';
import { MantenimientoAnuncioService } from 'src/app/shared/services/mantenimiento-anuncio/mantenimiento-anuncio.service';
import { ClientResponseResult } from 'src/app/Models/ClientResponseModels';

@Component({
    selector: 'app-listado',
    templateUrl: './listado.component.html',
    styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
    listaAnuncios: any;
    pageSize = 10;     // Limit number for pagination display number.  
    totalCount = 0;  // Total number of items in all pages. initialize as a zero  
    pageIndex = 1;
    pageSizeSelected = 10;

    ngOnInit(): void {
        this.listadoAnuncios();
    }

    constructor(
        private mantenimientoAnuncioService: MantenimientoAnuncioService

    ) { }

    listadoAnuncios() {
        let entidad: any = {
            beanPaginate: {
                pageIndex: 0,
                pageSize: 0
            }
        };
        entidad.beanPaginate.pageIndex = this.pageIndex;
        entidad.beanPaginate.pageSize = this.pageSizeSelected;
        this.mantenimientoAnuncioService.ListarAnuncioPaginate(entidad).subscribe(
            (res: ClientResponseResult<any>) => {
                this.listaAnuncios = JSON.parse(res.result.DataJson);
                this.totalCount = res.result.totalCount;
            }
        );
    }
}