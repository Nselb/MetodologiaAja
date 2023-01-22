import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-riotregister',
    templateUrl: './riotregister.component.html',
    styleUrls: ['./riotregister.component.css']
})
export class RiotRegisterComponent {
    public usuario: Usuario = {
        usuarioID: '',
        usuarioNombre: '',
        usuarioPassword: '',
        usuarioTipo: 0,
        empresaID: 1
    };;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        if (Number(localStorage.getItem('empresa')) != 1) {
            router.navigate(['/'])
        }
    }

    registrar(){
        this.http.post<Usuario>(this.baseUrl + 'Usuarios', this.usuario).subscribe(result => {
            this.router.navigate(['/trabajadoresr'])
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

