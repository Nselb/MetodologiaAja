import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GeneralComponent } from './general/general.component';
import { KFCComponent } from './kfc/kfc.component';
import { RiotComponent } from './riot/riot.component';
import { GeneralRegisterComponent } from './general/generalregister.component';
import { AplicacionesComponent } from './aplicaciones/aplicaciones.component';
import { AplicacionesRegisterComponent } from './aplicaciones/aplicacionesregister.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    KFCComponent,
    LoginComponent,
    RiotComponent,
    GeneralComponent,
    GeneralRegisterComponent,
    AplicacionesComponent,
    AplicacionesRegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'trabajadorese', component: GeneralComponent },
      { path: 'trabajadoresk', component: KFCComponent },
      { path: 'trabajadoresr', component: RiotComponent },
      { path: 'registrar', component: GeneralRegisterComponent },
      { path: 'aplicaciones', component: AplicacionesComponent },
      { path: 'registraraplicacion', component: AplicacionesRegisterComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
