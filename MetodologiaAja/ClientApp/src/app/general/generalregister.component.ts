import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-generalregister',
    templateUrl: './generalregister.component.html',
    styleUrls: ['./generalregister.component.css']
})
export class GeneralRegisterComponent {
    public usuario: Usuario = {
        usuarioID: '',
        usuarioNombre: '',
        usuarioPassword: '',
        usuarioTipo: 0,
        empresaID: 0
    };;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        if (Number(localStorage.getItem('tipoUsuario')) != 1) {
            router.navigate(['/'])
        }
    }

    registrar() {
        this.http.post<Usuario>(this.baseUrl + 'Usuarios', this.usuario).subscribe(result => {
            this.router.navigate(['/trabajadorese'])
        }, error => console.error(error));
    }
}

interface Usuario {
    usuarioID: string;
    usuarioNombre: string;
    usuarioPassword: string;
    empresaID: number;
    usuarioTipo: number;
}

