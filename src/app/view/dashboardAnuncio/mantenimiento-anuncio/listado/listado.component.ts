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
    listado: any[];
    flagexistRegistro: any = true;
    public itemsPerPage: number = 5;
    public totalItems: number = 0;
    public currentPage: number = 1;
    paginacion: any = {};
    // web para guiarse con la paginacion
    //https://valor-software.com/ngx-bootstrap/#/pagination
    ngOnInit(): void {
        //this.listadoAnuncios();
        this.loadDatos();
    }
    pageChanged(event: any): void {
        this.currentPage = event.page;
        this.loadDatos();
    };

    constructor(
        private mantenimientoAnuncioService: MantenimientoAnuncioService

    ) {
        this.paginacion.ItemsPerPage = this.itemsPerPage;
        this.paginacion.TotalItems = this.totalItems;
        this.paginacion.CurrentPage = this.currentPage;
    }

    loadDatos(): void {
        this.paginacion.CurrentPage = this.currentPage;
        this.mantenimientoAnuncioService.ListaPaginado(this.paginacion).subscribe(
            (res) => {
                if (res.Status = 'OK') {
                    this.listado = JSON.parse(res.DataJson);
                }
                if (this.listado.length > 0) {
                    this.flagexistRegistro = true;
                } else {
                    this.flagexistRegistro = false;
                }
                let s: any = JSON.parse(res.paginacion);
                this.totalItems = s.TotalItems;
            },
            error => {
            }
        );
    }
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