import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MachineStatus, NPMachine, STMachine } from '@lib/types';
import { LuckyGachaService, Machine } from '@services/lucky-gacha.service';

export function machineStatusGuard(machine?: NPMachine | STMachine): CanActivateFn {
  return (route) => {
    const luckyGachaService = inject(LuckyGachaService);

    return new Observable((subscriber) => {
      luckyGachaService.getMachinesStatus().subscribe((machines) => {
        const machineState: Machine | undefined =
          machines[machine || (route.paramMap.get('machine') as STMachine | NPMachine)];

        subscriber.next(machineState?.status === MachineStatus.AVAILABLE || createUrlTreeFromSnapshot(route, ['..']));
        subscriber.complete();
      });
    });
  };
}
