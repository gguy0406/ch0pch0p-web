import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Machine } from '@lib/dto-types';
import { STMachine } from '@lib/types';

export { Machine } from '@lib/dto-types';

export type MachineMap = Record<STMachine, Machine>;

@Injectable({ providedIn: 'root' })
export class LuckyGachaService {
  machines: WritableSignal<MachineMap | undefined> = signal(undefined);

  private _baseUrl = '/swappable-traits';

  constructor(private readonly _httpClient: HttpClient) {}

  getMachinesStatus() {
    return this._httpClient.get<Machine[]>(`${this._baseUrl}/machines`).pipe(
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
