import { Routes } from '@angular/router';
import { ROUTE } from '../lib/constants';
import { HomeComponent } from './main/home/home.component';
import { ThreeDSlideShowComponent } from './components/thee-d-slide-show/three-d-slide-show.component';
import { PageNotFoundComponent } from './page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: ROUTE.C0,
    component: ThreeDSlideShowComponent,
    data: { srcFolder: 'assets/c0-274-webp' },
    title: '"0" by ch0pch0p',
  },
  { path: '**', component: PageNotFoundComponent },
];
