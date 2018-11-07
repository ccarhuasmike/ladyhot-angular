import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable() // The Injectable decorator is required for dependency injection to work
export class AnuncioService {
    constructor(private http: Http) {
    }
    // fetchAll() {
    //     return this.http.get('https://api.github.com/repositories').map(res => res.json());
    // }
    getListTipoServicio() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Los Olivos",
            flag: false
        },
        {
            codigo: 2,
            descripcion: "SMP",
            flag: false
        },
        {
            codigo: 3,
            descripcion: "Lince",
            flag: false
        },
        {
            codigo: 4,
            descripcion: 'Lima',
            flag: false
        },
        {
            codigo: 5,
            descripcion: 'La Molina',
            flag: false
        },
        {
            codigo: 6,
            descripcion: 'Callao',
            flag: false
        },
        {
            codigo: 7,
            descripcion: 'San Borja',
            flag: false
        },
        {
            codigo: 8,
            descripcion: 'Chorrillos',
            flag: false
        },
        {
            codigo: 9,
            descripcion: 'Comas',
            flag: false
        },
        {
            codigo: 10,
            descripcion: 'Pachacamac',
            flag: false
        },
        {
            codigo: 11,
            descripcion: 'SJL',
            flag: false
        },
        {
            codigo: 12,
            descripcion: 'Miraflores',
            flag: false
        }
        ];
    }

    getListFormaPago() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Efectivo",
            flag: false
        },
        {
            codigo: 2,
            descripcion: "Tarjeta Cred.",
            flag: false
        },
        {
            codigo: 3,
            descripcion: "Tranf. Banc",
            flag: false
        },

        ];
    }

    getListLugarAtencion() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Los Olivos",
            flag: false
        },
        {
            codigo: 2,
            descripcion: "SMP",
            flag: false
        },
        {
            codigo: 3,
            descripcion: "Lince",
            flag: false
        },
        {
            codigo: 4,
            descripcion: 'Lima',
            flag: false
        },
        {
            codigo: 5,
            descripcion: 'La Molina',
            flag: false
        },
        {
            codigo: 6,
            descripcion: 'Callao',
            flag: false
        },
        {
            codigo: 7,
            descripcion: 'San Borja',
            flag: false
        },
        {
            codigo: 8,
            descripcion: 'Chorrillos',
            flag: false
        },
        {
            codigo: 9,
            descripcion: 'Comas',
            flag: false
        },
        {
            codigo: 10,
            descripcion: 'Pachacamac',
            flag: false
        },
        {
            codigo: 11,
            descripcion: 'SJL',
            flag: false
        },
        {
            codigo: 12,
            descripcion: 'Miraflores',
            flag: false
        }
        ];
    }

    getListDistrito() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Los Olivos",
            flag: false
        },
        {
            codigo: 2,
            descripcion: "SMP",
            flag: false
        },
        {
            codigo: 3,
            descripcion: "Lince",
            flag: false
        },
        {
            codigo: 4,
            descripcion: 'Lima',
            flag: false
        },
        {
            codigo: 5,
            descripcion: 'La Molina',
            flag: false
        },
        {
            codigo: 6,
            descripcion: 'Callao',
            flag: false
        },
        {
            codigo: 7,
            descripcion: 'San Borja',
            flag: false
        },
        {
            codigo: 8,
            descripcion: 'Chorrillos',
            flag: false
        },
        {
            codigo: 9,
            descripcion: 'Comas',
            flag: false
        },
        {
            codigo: 10,
            descripcion: 'Pachacamac',
            flag: false
        },
        {
            codigo: 11,
            descripcion: 'SJL',
            flag: false
        },
        {
            codigo: 12,
            descripcion: 'Miraflores',
            flag: false
        }
        ];
    }


    getListEdad() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "18 Años",
        },
        {
            codigo: 2,
            descripcion: "22 Años",
        },
        {
            codigo: 3,
            descripcion: "24 Años",
        },
        {
            codigo: 4,
            descripcion: '20 Años',
        }
        ];
    }
    getListPais() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Peru",
        },
        {
            codigo: 2,
            descripcion: "Venezuala",
        },
        {
            codigo: 3,
            descripcion: "Argentica",
        },
        {
            codigo: 4,
            descripcion: 'Cuba',
        }
        ];
    }
    getListEstudios() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Universitarias",
        },
        {
            codigo: 2,
            descripcion: "Enfermera",
        }
        ];
    }
    getListCabellos() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Negro",
        },
        {
            codigo: 2,
            descripcion: "Rojo",
        }
        ];
    }
    getListOjos() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Verdes Claro",
        },
        {
            codigo: 2,
            descripcion: "Gatos",
        }
        ];
    }
    getListEstatura() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "150",
        },
        {
            codigo: 2,
            descripcion: "180",
        }
        ];
    }
    getListPeso() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "90",
        },
        {
            codigo: 2,
            descripcion: "70",
        }
        ];
    }




}