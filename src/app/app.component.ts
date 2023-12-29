import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, NavComponent],
})
export class AppComponent {
  @HostListener('window:scroll') onScroll() {
    this.navContainerPadding = Math.min(window.scrollY, 128);
  }

  title = 'ch0pch0p-web';

  protected navContainerPadding: number = 0;
}
