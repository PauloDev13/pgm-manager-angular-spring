import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-notifier-snackbar',
  standalone: true,
  imports: [
    MatSnackBarModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatButton,
    MatMiniFabButton,
    NgStyle,
  ],
  templateUrl: './notifier-snackbar.component.html',
  styleUrl: './notifier-snackbar.component.scss',
})
export class NotifierSnackbarComponent {
  data: { message: string; buttonText: string } = inject(MAT_SNACK_BAR_DATA);
  snackBarRef: MatSnackBarRef<NotifierSnackbarComponent> =
    inject(MatSnackBarRef);

  onYes() {
    this.snackBarRef.dismiss();
    this.snackBarRef
      .afterDismissed()
      .pipe(take(1))
      .subscribe({
        next: () => console.log('CLICOU EM SIM'),
      });
  }
}
