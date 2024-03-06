import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Machine } from '@lib/dto-types';
import { NPMachine, STMachine } from '@lib/types';
import { API_ROUTE, LUCKY_GACHA_ROUTE } from 'lib/constants';

export { Machine } from '@lib/dto-types';

export type MachineMap = Record<STMachine | NPMachine, Machine>;

@Injectable({ providedIn: 'root' })
export class LuckyGachaService {
  machines: WritableSignal<MachineMap | undefined> = signal(undefined);

  private _baseUrl = API_ROUTE.LUCKY_GACHA;

  constructor(private readonly _httpClient: HttpClient) {}

  getMachinesStatus() {
    return this._httpClient.get<Machine[]>(`${this._baseUrl}${LUCKY_GACHA_ROUTE.MACHINES}`).pipe(
      tap((machines) =>
        this.machines.set(
          machines.reduce((map, machine) => {
            map![machine.id] = machine;

            return map;
          }, {} as MachineMap)
        )
      )
    );
  }
}
