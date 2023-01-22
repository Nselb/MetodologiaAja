import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.css']
})
export class GeneralComponent {
    public usuarios: Usuario[] = [];

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
        if (Number(localStorage.getItem('tipoUsuario')) != 1) {
            router.navigate(['/'])
        }
        http.get<Usuario[]>(baseUrl + 'Usuarios').subscribe(result => {
            this.usuarios = result;
        }, error => console.error(error));
    }

    registrar() {
        this.router.navigate(['/registrar'])
    }
}

interface Usuario {
    usuarioID: string;
    usuarioNombre: string;
    usuarioPassword: string;
    empresaID: number;
    usuarioTipo: number;
}

