import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, WritableSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { finalize } from 'rxjs/operators';

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
  imports: [
    ClipboardModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    NgOptimizedImage,
    MatTooltipModule,
  ],
  providers: [EventRegisterService, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
})
export class DialogEventRegisterComponent {
  protected readonly TICKET = Ticket;
  protected model;
  protected isSubmitting: WritableSignal<boolean> = signal(false);
  protected successSubmitted: WritableSignal<boolean> = signal(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) _data: DialogData,
    protected dialogRef: MatDialogRef<void>,
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
    this.isSubmitting.set(true);
    this._eventRegisterService
      .register(this.model)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe(() => this.successSubmitted.set(true));
  }
}
