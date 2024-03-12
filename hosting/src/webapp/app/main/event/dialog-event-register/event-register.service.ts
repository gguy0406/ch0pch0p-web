import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EventRegister } from '@lib/types';
import { API_ROUTE } from 'lib/constants';

@Injectable()
export class EventRegisterService {
  private _baseUrl = API_ROUTE.EVENT_REGISTERS;

  constructor(private readonly _httpClient: HttpClient) {}

  register(registerForm: EventRegister) {
    return this._httpClient.post(`${this._baseUrl}`, registerForm);
  }
}
