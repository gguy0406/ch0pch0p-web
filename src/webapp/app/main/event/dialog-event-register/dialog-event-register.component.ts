import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Ticket } from '@lib/types';

export interface DialogData {
  ticket: Ticket;
}

@Component({
  selector: 'app-dialog-event-register',
  templateUrl: './dialog-event-register.component.html',
  styleUrl: './dialog-event-register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatDialogContent, MatFormFieldModule, MatInputModule, MatSelectModule],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
})
export class DialogEventRegisterComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data);
  }
}
