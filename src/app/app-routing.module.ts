import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { EditarComponent } from './components/editar/editar.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { ListarComponent } from './components/listar/listar.component';


const routes: Routes = [
  { path: '', component: ListarComponent },
  { path: 'nuevo', component: NuevoComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: 'eliminar/:id', component: EliminarComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
