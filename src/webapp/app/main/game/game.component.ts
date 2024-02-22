import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WalletService } from '@services/wallet.service';

@Component({
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule],
})
export class GameComponent implements OnInit, OnDestroy {
  constructor(private _walletService: WalletService) {}

  ngOnInit(): void {
    this._walletService.isActive.set(true);
  }

  ngOnDestroy(): void {
    this._walletService.isActive.set(false);
  }
}
