import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-kfcregister',
    templateUrl: './kfcregister.component.html',
    styleUrls: ['./kfcregister.component.css']
})
export class KFCRegisterComponent {
    public usuario: Usuario = {
        usuarioID: '',
        usuarioNombre: '',
        usuarioPassword: '',
        usuarioTipo: 0,
        empresaID: 2
    };;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        if (Number(localStorage.getItem('empresa')) != 2) {
            router.navigate(['/'])
        }
    }

    registrar() {
        this.http.post<Usuario>(this.baseUrl + 'Usuarios', this.usuario).subscribe(result => {
            this.router.navigate(['/trabajadoresk'])
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

