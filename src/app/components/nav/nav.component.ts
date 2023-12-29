import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { C1_URL } from 'src/lib/constants';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, NgOptimizedImage, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  @ViewChild('collectionMenuTrigger', { static: true }) protected collectionMenuTrigger!: MatMenuTrigger;

  get isActive(): boolean {
    return this.collectionMenuTrigger.menuOpen;
  }

  protected readonly C1_URL = C1_URL;
}
