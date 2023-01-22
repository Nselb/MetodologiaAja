import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-riot',
    templateUrl: './riot.component.html',
    styleUrls: ['./riot.component.css']
})
export class RiotComponent {
    public usuarios: Usuario[] = [];

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
        if (Number(localStorage.getItem('empresa')) != 1) {
            router.navigate(['/'])
        }
        http.get<Usuario[]>(baseUrl + 'Usuarios/Empresa/1').subscribe(result => {
            this.usuarios = result;
        }, error => console.error(error));
    }

    registrar() {
        this.router.navigate(['/registrarr'])
    }
}

interface Usuario {
    usuarioID: string;
    usuarioNombre: string;
    usuarioPassword: string;
    empresaID: number;
    usuarioTipo: number;
}

