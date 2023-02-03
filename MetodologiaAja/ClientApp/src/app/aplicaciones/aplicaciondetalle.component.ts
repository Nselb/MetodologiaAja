import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-aplicacionesregister',
    templateUrl: './aplicacionesregister.component.html',
    styleUrls: ['./aplicacionesregister.component.css']
})
export class AplicacionesRegisterComponent {
  public aplicacion: Aplicacion = {
    Id: 0,
    empresaAsegura: "",
    empresaPaga: "",
    desde: "",
    hasta: "",
    tipoTransporte: "",
    perteneciente: "",
    fechaEmbarque: new Date(),
    empresaConsignada: "",
    fechaLlegada: new Date(),
    embarcadoPor: "",
    notaPedido: "",
    ordenDeCompra: 0,
    afianzadorAduana: 0,
    marca: "",
    numero: 0,
    pesoBruto: 0,
    bultos: 0,
    montoTotal: 0,
    otrosGastos: 0,
    sumaAsegurada: 0,
    valorPrima: 0,
    cobertura: 0,
    deducible: 0,
    descripcionContenido: "",
    observaciones: ""
  };

  public usuario: number = 0

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        if (Number(localStorage.getItem('empresa')) != 1) {
            router.navigate(['/'])
        }
    }

    registrar(){
      this.http.post<Aplicacion>(this.baseUrl + 'Aplicaciones', this.aplicacion).subscribe(result => {
            this.router.navigate(['/aplicaciones'])
        }, error => console.error(error));
    }
}

interface Aplicacion {
  Id: number;
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
}
