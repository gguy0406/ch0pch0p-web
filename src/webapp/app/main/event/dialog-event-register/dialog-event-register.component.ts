import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Ticket } from '@lib/types';

import { EventRegisterService } from './event-register.service';

export interface DialogData {
  ticket: Ticket;
}

@Component({
  selector: 'app-dialog-event-register',
  templateUrl: './dialog-event-register.component.html',
  styleUrl: './dialog-event-register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatDialogContent, MatFormFieldModule, MatInputModule, MatSelectModule],
  providers: [EventRegisterService, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
})
export class DialogEventRegisterComponent {
  protected readonly TICKET = Ticket;
  protected model;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: DialogData,
    private _eventRegisterService: EventRegisterService
  ) {
    this.model = {
      email: '',
      ticket: _data.ticket,
      transactionHash: '',
      name: '',
      communityGang: '',
      walletId: '',
    };
  }

  protected onSubmit() {
    this._eventRegisterService.register(this.model).subscribe();
  }
}
