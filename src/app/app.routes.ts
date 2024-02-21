import { Routes } from '@angular/router';

import { ROUTE } from '../lib/constants';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { C0Component } from './main/c0/c0.component';
// import { GameComponent } from './main/game/game.component';
// import { LevelUpComponent } from './main/game/level-up/level-up.component';
// import { LuckyGachaComponent } from './main/game/lucky-gacha/lucky-gacha.component';
// import { SelectGameComponent } from './main/game/select-game/select-game.component';
import { HomeComponent } from './main/home/home.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, title: 'Home' },
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      {
        path: ROUTE.C0,
        component: C0Component,
        title: '"0" by ch0pch0p',
      },
      // {
      //   path: ROUTE.GAME,
      //   component: GameComponent,
      //   title: 'ch0p it!',
      //   children: [
      //     {
      //       path: '',
      //       component: SelectGameComponent,
      //     },
      //     {
      //       path: ROUTE.LUCKY_GACHA,
      //       component: LuckyGachaComponent,
      //       title: 'Lucky Gacha',
      //     },
      //     {
      //       path: ROUTE.LEVEL_UP,
      //       component: LevelUpComponent,
      //       title: 'Level Up',
      //     },
      //   ],
      // },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
