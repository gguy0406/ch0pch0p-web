import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EventRegister } from '@lib/types';

@Injectable()
export class EventRegisterService {
  private _baseUrl = '/event-register';

  constructor(private readonly _httpClient: HttpClient) {}

  register(registerForm: EventRegister) {
    return this._httpClient.post(`${this._baseUrl}/register`, registerForm);
  }
}
