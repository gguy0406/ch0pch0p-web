import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { C1Component } from './main/collection/c1.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'collection/c1',
    component: C1Component,
    title: 'C1',
  },
];
