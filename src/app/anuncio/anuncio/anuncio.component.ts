import {
    Component,
    OnInit
} from '@angular/core';
@Component({
    selector: 'app-footer',
    templateUrl: "./anuncio.component.html",
    styleUrls: ['./anuncio.component.css'],
})
export class AnuncioComponent implements OnInit {
    emails = [{
        codigo: 1,
        email: "email1",
        flag: false
    },
    {
        codigo: 2,
        email: "email2",
        flag: false
    },
    {
        codigo: 3,
        email: "email3",
        flag: false
    },
    {
        codigo: 4,
        email: 'email4',
        flag: false
    },
    {
        codigo: 5,
        email: 'email5',
        flag: false
    },
    {
        codigo: 6,
        email: 'email6',
        flag: false
    },
    {
        codigo: 7,
        email: 'email7',
        flag: false
    },
    {
        codigo: 8,
        email: 'email8',
        flag: false
    },
    {
        codigo: 9,
        email: 'email9',
        flag: false
    },
    {
        codigo: 10,
        email: 'email10',
        flag: false
    },
    {
        codigo: 11,
        email: 'email11',
        flag: false
    },
    {
        codigo: 12,
        email: 'email12',
        flag: false
    }
    ]

    constructor() { }
    ngOnInit() {


    }
    onChange(codigo: number, isChecked: boolean) {
        debugger;
        let index = this.emails.findIndex(x => x.codigo === codigo);
        if (isChecked) {
            this.emails[index].flag = isChecked;
        } else {
            this.emails[index].flag = isChecked;
        }
    }

}
