import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public usuario: Usuario = {
        usuarioID: '',
        usuarioNombre: '',
        usuarioPassword: '',
        usuarioTipo: 0,
        empresaID: 0
    };

    public error: string = ''

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        if (localStorage.getItem('empresa')) {
            this.router.navigate(['/'])
        }
    }

    login() {
        this.http.post<Usuario>(this.baseUrl + 'Usuarios/login', this.usuario).subscribe(result => {
            this.usuario = result;
            localStorage.setItem('tipoUsuario', '' + this.usuario.usuarioTipo)
            localStorage.setItem('empresa', '' + this.usuario.empresaID)
            localStorage.setItem('usuarioNombre', this.usuario.usuarioNombre)
            this.router.navigate(['/'])
            location.reload()
            if (!this.usuario) {
                this.error = 'Error'
            }
        }, error => {
            this.error = 'Error'
        });
    }
}

interface Usuario {
    usuarioID: string;
    usuarioNombre: string;
    usuarioPassword: string;
    empresaID: number;
    usuarioTipo: number;
}

