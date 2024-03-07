import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_ROUTE, NFT_POOL_ROUTE } from 'lib/constants';

@Injectable()
export class NftPoolService {
  private _baseUrl = API_ROUTE.NFT_POOL;

  constructor(private readonly _httpClient: HttpClient) {}

  play(address: string) {
    return this._httpClient.put<void>(`${this._baseUrl}${NFT_POOL_ROUTE.PLAY}/${address}`, {});
  }
}
