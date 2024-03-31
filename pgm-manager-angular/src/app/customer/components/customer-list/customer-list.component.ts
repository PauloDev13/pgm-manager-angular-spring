import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { SearchComponent } from '../../../core/components/search/search.component';
import { InstallmentStore } from '../../../installment/store/installment.store';
import { LoaderSpinnerComponent } from '../../../shared/components/loader-spinner/loader-spinner.component';
import { NotifierService } from '../../../shared/service/notifier.service';
import { CustomerListModel } from '../../model/customer-list.model';
import { CustomerStore } from '../../store/custumer.store';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    DatePipe,
    MatPaginator,
    ReactiveFormsModule,
    SearchComponent,
    LoaderSpinnerComponent,
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent {
  //Stores
  protected readonly customerStore = inject(CustomerStore);
  protected readonly installmentStore = inject(InstallmentStore);
  // Services
  protected readonly notifierService = inject(NotifierService);
  protected readonly router = inject(Router);
  // Variables
  protected pageIndex: number = 0;
  protected pageSize: number = 10;

  refresh(
    pageEvent: PageEvent = {
      length: this.customerStore.totalElements(),
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    },
  ) {
    this.customerStore.loadSearchPagination({
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize,
    });
  }
  onAddInstallment(customer: CustomerListModel) {
    const result = this.installmentStore
      .listInstallments()
      .some(resp => customer.id === resp.customer.id && !resp.finished);

    if (result) {
      this.notifierService.showNotification(
        `${customer.name.toUpperCase()} está em atendimento.`,
        'X',
        'warning-snackbar',
      );
    } else {
      this.router.navigate(['/installment'], { state: customer }).then();
    }
  }

  onSearch(query: string) {
    this.customerStore.updateFilter({
      query,
      page: this.pageIndex,
      size: this.pageSize,
    });
  }

  onDeleteCustomer(customerId: number) {
    this.notifierService
      .showConfirmation({
        displayMsg: `Ao remover um cliente, também serão removidos
      todos os atendimentos a ele vinculados. REMOVER CLIENTE?`,
        cssType: 'finish-snackbar',
      })
      .afterDismissed()
      .pipe(take(1))
      .subscribe({
        next: action => {
          if (action.dismissedByAction) {
            this.customerStore.deleteCustomer({ id: customerId });
          }
        },
      });
  }
}
