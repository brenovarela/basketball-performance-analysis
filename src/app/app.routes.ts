import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourFactorsComponent } from './four-factors/four-factors.component';

export const routes: Routes = [
  { path: 'four-factors', component: FourFactorsComponent },
  { path: '', redirectTo: '/four-factors', pathMatch: 'full' }, // Redireciona para 'four-factors' por padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
