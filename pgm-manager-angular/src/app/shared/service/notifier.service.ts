import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotifierSnackbarComponent } from '../components/notifier-snackbar/notifier-snackbar.component';

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
      // duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: cssType,
    });
  }
}
