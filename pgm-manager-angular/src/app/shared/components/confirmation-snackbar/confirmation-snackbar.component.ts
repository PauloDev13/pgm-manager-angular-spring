import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { take } from 'rxjs';

import { InstallmentStore } from '../../../installment/store/installment.store';

@Component({
  selector: 'app-confirmation-snackbar',
  standalone: true,
  imports: [MatButton],
  templateUrl: './confirmation-snackbar.component.html',
  styleUrl: './confirmation-snackbar.component.scss',
})
export class ConfirmationSnackbarComponent {
  protected data: { message: string; id: number } = inject(MAT_SNACK_BAR_DATA);
  protected snackBarRef: MatSnackBarRef<ConfirmationSnackbarComponent> =
    inject(MatSnackBarRef);
  protected installmentStore = inject(InstallmentStore);

  onYes() {
    this.snackBarRef.dismiss();
    this.snackBarRef
      .afterDismissed()
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.installmentStore.updateStatus({ id: this.data.id });
          this.installmentStore.updateFilter({
            status: false,
            page: 0,
            size: 10,
            query: '',
          });
        },
      });
  }
}
