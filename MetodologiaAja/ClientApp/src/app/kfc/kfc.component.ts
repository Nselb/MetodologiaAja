import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-kfc',
    templateUrl: './kfc.component.html',
    styleUrls: ['./kfc.component.css']
})
export class KFCComponent {
    public usuarios: Usuario[] = [];

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
        if (Number(localStorage.getItem('empresa')) != 2) {
            router.navigate(['/'])
        }
        http.get<Usuario[]>(baseUrl + 'Usuarios/Empresa/2').subscribe(result => {
            this.usuarios = result;
        }, error => console.error(error));
    }
    registrar(){
        this.router.navigate(['/registrark'])
    }
}

interface Usuario {
    usuarioID: string;
    usuarioNombre: string;
    usuarioPassword: string;
    empresaID: number;
    usuarioTipo: number;
}


