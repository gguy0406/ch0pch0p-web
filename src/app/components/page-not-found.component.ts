import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `<img src="assets/app/intro.gif" alt="page not found placeholder" width="100%" />`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class PageNotFoundComponent {}
