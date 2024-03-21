import { Component, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifier-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './notifier-snackbar.component.html',
  styleUrl: './notifier-snackbar.component.scss',
})
export class NotifierSnackbarComponent {
  data: { message: string; buttonText: string } = inject(MAT_SNACK_BAR_DATA);
  snackBarRef: MatSnackBarRef<NotifierSnackbarComponent> =
    inject(MatSnackBarRef);
}
