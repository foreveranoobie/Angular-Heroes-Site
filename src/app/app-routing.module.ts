import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Component2Component } from './component2/component2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/top-heroes', pathMatch: 'full'},
  { path: 'heroes', component: Component2Component},
  { path: 'top-heroes', component: DashboardComponent},
  { path: 'hero-detail/:id', component: HeroDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
