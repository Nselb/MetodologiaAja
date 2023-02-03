import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aplicaciones',
  templateUrl: './aplicaciones.component.html',
  styleUrls: ['./aplicaciones.component.css']
})
export class AplicacionesComponent {
  public aplicaciones: Aplicacion[] = [];
  public tipo: number = 0;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    if (!Number(localStorage.getItem('empresa'))) {
      router.navigate(['/'])
    }
    this.tipo = Number(localStorage.getItem("tipoUsuario"));
    if (this.tipo == 1) {
      this.http.get<Aplicacion[]>(baseUrl + 'Aplicaciones').subscribe(result => {
        console.log(baseUrl)

        this.aplicaciones = result;
      }, error => console.error(error));
    } else {
      this.http.get<Aplicacion[]>(baseUrl + 'Aplicaciones/byEmpresa/' + localStorage.getItem('empresa')).subscribe(result => {
        console.log(baseUrl)
        this.aplicaciones = result;
      }, error => console.error(error));
    }
  }

  crear() {
    this.router.navigate(['/registraraplicacion'])
  }

  eliminar(data: number) {
    this.http.post<Aplicacion[]>(this.baseUrl + 'Aplicaciones/anularAplicacion/' + data, 0).subscribe(result => {
      this.aplicaciones = result;
    }, error => console.error(error));
  }
}

interface Aplicacion {
  id: number;
  empresaAsegura: string;
  empresaPaga: string;
  desde: string;
  hasta: string;
  tipoTransporte: string;
  perteneciente: string;
  fechaEmbarque: Date;
  empresaConsignada: string;
  fechaLlegada: Date;
  embarcadoPor: string;
  notaPedido: string;
  ordenDeCompra: number;
  afianzadorAduana: number;
  marca: string;
  numero: number;
  pesoBruto: number;
  bultos: number;
  montoTotal: number;
  otrosGastos: number;
  sumaAsegurada: number;
  valorPrima: number;
  cobertura: number;
  deducible: number;
  descripcionContenido: string;
  observaciones: string;
  estado: string;
}


