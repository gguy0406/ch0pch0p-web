import { Routes } from '@angular/router';

import { ROUTE } from '../lib/constants';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { C0Component } from './main/c0/c0.component';
import { HomeComponent } from './main/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      {
        path: ROUTE.C0,
        component: C0Component,
        title: '"0" by ch0pch0p',
      },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];
