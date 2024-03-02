import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { Ticket } from '@lib/types';

import { DialogData, DialogEventRegisterComponent } from './dialog-event-register/dialog-event-register.component';
import { StickyNavComponent } from '@components/sticky-nav';
import { FooterComponent } from '@components/footer';

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
export class EventComponent implements OnInit {
  protected readonly TICKET = Ticket;
  protected agendaDay: WritableSignal<1 | 2 | 3> = signal(1);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (new Date().getTime() > new Date(2024, 2, 10).getTime()) {
      this.agendaDay.set(3);
    } else if (new Date().getTime() > new Date(2024, 2, 9).getTime()) {
      this.agendaDay.set(2);
    }
  }

  protected buyTicket(ticket: Ticket) {
    this.dialog.open(DialogEventRegisterComponent, {
      data: { ticket } satisfies DialogData,
      width: '900px',
      panelClass: 'rounded-[50px]',
    });
  }
}
