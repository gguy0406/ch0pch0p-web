import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, WritableSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { Ticket } from '@lib/types';

import { DialogData, DialogEventRegisterComponent } from './dialog-event-register/dialog-event-register.component';
import { StickyNavComponent } from '@components/sticky-nav';
import { FooterComponent } from '@components/footer';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    NgOptimizedImage,
    NgTemplateOutlet,
    FooterComponent,
    StickyNavComponent,
  ],
})
export class EventComponent implements OnInit, AfterViewInit {
  @ViewChild('agendaSection') protected agendaElement!: ElementRef<HTMLDivElement>;

  protected readonly TICKET = Ticket;
  protected agendaDay: WritableSignal<1 | 2 | 3> = signal(1);

  constructor(private dialog: MatDialog, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    if (new Date().getTime() > new Date(2024, 2, 10).getTime()) {
      this.agendaDay.set(3);
    } else if (new Date().getTime() > new Date(2024, 2, 9).getTime()) {
      this.agendaDay.set(2);
    }
  }

  ngAfterViewInit(): void {
    this._route.fragment.subscribe((fragment: string | null) => {
      fragment?.toLowerCase() === 'agenda' && setTimeout(() => this.agendaElement.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      }));
    })
  }

  protected buyTicket(ticket: Ticket) {
    this.dialog.open(DialogEventRegisterComponent, {
      data: { ticket } satisfies DialogData,
      width: '900px',
      backdropClass: ['bg-app', '!opacity-90'],
      panelClass: 'rounded-[50px]',
    });
  }
}
