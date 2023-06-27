import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaReproduccionGuard } from './core/guards/lista-reproduccion.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((h) => h.HomeModule),
    canLoad: [ListaReproduccionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
