import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  logged = false;
  tipo = 0;
  empresa = 0;

  ngOnInit(): void {
    this.logged = localStorage.getItem('usuarioNombre') != null
    this.tipo = Number(localStorage.getItem('tipoUsuario'))
    this.empresa = Number(localStorage.getItem('empresa'))
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  cerrarSesion(){
    localStorage.clear()
    location.reload()
  }
}
