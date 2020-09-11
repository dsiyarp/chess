import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarComponent } from './components/listar/listar.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { EditarComponent } from './components/editar/editar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    NuevoComponent,
    EditarComponent,
    EliminarComponent,
    LoadingComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
