import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { PageLayoutComponent } from './components/page-layout';
import { PageNotFoundComponent } from './components/page-not-found';
import { RouterOutletContainerComponent } from './components/router-outlet-container';
import { ROUTE } from './lib/constants';
import { NPMachine } from './lib/types';
import { C0Component } from './main/c0/c0.component';
import { GameComponent } from './main/game/game.component';
import { LevelUpComponent } from './main/game/level-up/level-up.component';
import { NPMachineComponent } from './main/game/lucky-gacha/np-machine/np-machine.component';
import { STMachineComponent } from './main/game/lucky-gacha/st-machine/st-machine.component';
import { LuckyGachaComponent } from './main/game/lucky-gacha/lucky-gacha.component';
import { machineStatusGuard } from './main/game/lucky-gacha/machine-status.guard';
import { HomeComponent } from './main/home/home.component';
import { WalletService } from './services/wallet.service';
import { EventComponent } from './main/event/event.component';

const useWalletRouteGuard = {
  canActivate: [
    () => {
      inject(WalletService).isActive.set(true);
      return true;
    },
  ],
  canDeactivate: [
    () => {
      inject(WalletService).isActive.set(false);
      return true;
    },
  ],
};

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
        data: { usePageMargin: true },
      },
      {
        path: ROUTE.GAME,
        component: RouterOutletContainerComponent,
        title: 'ch0p it!',
        ...useWalletRouteGuard,
        children: [
          {
            path: '',
            component: GameComponent,
          },
          {
            path: ROUTE.LUCKY_GACHA,
            component: RouterOutletContainerComponent,
            title: 'Lucky Gacha',
            children: [
              {
                path: '',
                component: LuckyGachaComponent,
              },
              {
                path: 'cosmos-nft-conference',
                component: NPMachineComponent,
                canActivate: [machineStatusGuard(NPMachine.CNC)],
              },
              {
                path: ':machine',
                component: STMachineComponent,
                canActivate: [machineStatusGuard()],
              },
            ],
          },
          {
            path: ROUTE.LEVEL_UP,
            component: LevelUpComponent,
            title: 'Level Up',
          },
        ],
      },
    ],
  },
  {
    path: ROUTE.EVENT,
    component: EventComponent,
    title: 'Cosmos NFT Conference',
  },
  { path: '**', component: PageNotFoundComponent },
];
