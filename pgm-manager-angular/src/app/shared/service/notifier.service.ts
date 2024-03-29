import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmationSnackbarComponent } from '../components/confirmation-snackbar/confirmation-snackbar.component';
import { NotifierSnackbarComponent } from '../components/notifier-snackbar/notifier-snackbar.component';
import { TDataSnackbar } from '../types/shared.type';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  protected snackBar = inject(MatSnackBar);

  showNotification(
    displayMsg: string,
    labelButton: string,
    cssType: 'success-snackbar' | 'warning-snackbar' | 'error-snackbar',
  ) {
    this.snackBar.openFromComponent(NotifierSnackbarComponent, {
      data: {
        message: displayMsg,
        buttonText: labelButton,
      },
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: cssType,
    });
  }

  showConfirmation({ displayMsg, cssType }: TDataSnackbar) {
    return this.snackBar.openFromComponent(ConfirmationSnackbarComponent, {
      data: {
        message: displayMsg,
      },
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: cssType,
    });
  }
}
