import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { Ticket } from '@lib/types';

import { DialogData, DialogEventRegisterComponent } from './dialog-event-register/dialog-event-register.component';

@Component({
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatExpansionModule, MatIconModule, NgOptimizedImage, NgTemplateOutlet],
})
export class EventComponent implements OnInit {
  protected readonly TICKET = Ticket;
  protected agendaStep: WritableSignal<1 | 2 | 3> = signal(1);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (new Date().getTime() > new Date(2024, 2, 10).getTime()) {
      this.agendaStep.set(3);
    } else if (new Date().getTime() > new Date(2024, 2, 9).getTime()) {
      this.agendaStep.set(2);
    }
  }

  protected buyTicket(ticket: Ticket) {
    this.dialog.open(DialogEventRegisterComponent, { data: { ticket } satisfies DialogData });
  }
}
