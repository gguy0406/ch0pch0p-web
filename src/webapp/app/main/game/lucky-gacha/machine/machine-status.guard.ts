import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MachineStatus, STMachine } from '@lib/types';
import { LuckyGachaService, MachineMap } from '@services/lucky-gacha.service';

export const machineStatusGuard: CanActivateFn = (route) => {
  const luckyGachaService = inject(LuckyGachaService);

  if (!luckyGachaService.machines()) {
    return new Observable((subscriber) => {
      luckyGachaService.getMachinesStatus().subscribe(() => {
        subscriber.next(guardCheck(luckyGachaService.machines()!, route));
        subscriber.complete();
      });
    });
  } else {
    return guardCheck(luckyGachaService.machines()!, route);
  }
};

const guardCheck = (machines: MachineMap, route: ActivatedRouteSnapshot) => {
  return (
    machines[route.paramMap.get('machine') as STMachine].status === MachineStatus.AVAILABLE ||
    createUrlTreeFromSnapshot(route, ['..'])
  );
};
