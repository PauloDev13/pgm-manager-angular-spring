import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation-snackbar',
  standalone: true,
  imports: [MatButton],
  templateUrl: './confirmation-snackbar.component.html',
  styleUrl: './confirmation-snackbar.component.scss',
})
export class ConfirmationSnackbarComponent {
  protected data: { message: string } = inject(MAT_SNACK_BAR_DATA);
  protected snackBarRef: MatSnackBarRef<ConfirmationSnackbarComponent> =
    inject(MatSnackBarRef);
}
