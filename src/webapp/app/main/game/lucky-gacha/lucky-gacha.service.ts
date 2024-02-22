import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Machines } from '@lib/dto-types';

export { Machines } from '@lib/dto-types';

@Injectable()
export class LuckyGachaService {
  constructor(private readonly _httpClient: HttpClient) {}

  getMachinesStatus() {
    return this._httpClient.get<Machines>(`http://localhost:4000/api/swappable-traits/machines`);
  }
}
