import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { API_ROUTE, LUCKY_GACHA_ROUTE } from '@lib/constants';
import { Machine } from '@lib/dto-types';
import { NPMachine, STMachine } from '@lib/types';

export { Machine } from '@lib/dto-types';

export type MachineMap = Record<STMachine | NPMachine, Machine>;

@Injectable({ providedIn: 'root' })
export class LuckyGachaService {
  machines?: MachineMap;

  private _baseUrl = API_ROUTE.LUCKY_GACHA;

  constructor(private readonly _httpClient: HttpClient) {}

  getMachinesStatus() {
    return this._httpClient.get<Machine[]>(`${this._baseUrl}${LUCKY_GACHA_ROUTE.MACHINES}`).pipe(
      map((machines) =>
        machines.reduce((map, machine) => {
          map![machine.id] = machine;

          return map;
        }, {} as MachineMap)
      ),
      tap((machines) => (this.machines = machines))
    );
  }
}
