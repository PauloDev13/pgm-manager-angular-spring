import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { SearchComponent } from '../../../core/components/search/search.component';
import { LoaderSpinnerComponent } from '../../../shared/components/loader-spinner/loader-spinner.component';
import { InstallmentListModel } from '../../model/installment-list.model';
import { InstallmentStore } from '../../store/installment.store';

@Component({
  selector: 'app-installment-list',
  standalone: true,
  imports: [DatePipe, MatPaginator, SearchComponent, LoaderSpinnerComponent],
  templateUrl: './installment-list.component.html',
  styleUrl: './installment-list.component.scss',
})
export default class InstallmentListComponent {
  // Stores
  protected installmentStore = inject(InstallmentStore);
  // Variables
  protected pageIndex: number = 0;
  protected pageSize: number = 10;

  refresh(
    pageEvent: PageEvent = {
      length: this.installmentStore.totalElements(),
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    },
  ) {
    this.installmentStore.loadSearchPagination({
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize,
    });
  }

  updateStatus(installment: InstallmentListModel) {
    if (
      confirm(
        `FINALIZAR O ATENDIMENTO PARA: ${installment.customer.name.toUpperCase()}`,
      )
    ) {
      this.installmentStore.updateStatus({ id: installment.id });
    }
  }
}
