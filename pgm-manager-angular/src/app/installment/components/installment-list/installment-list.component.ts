import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { InstallmentStore } from '../../store/installment.store';

@Component({
  selector: 'app-installment-list',
  standalone: true,
  imports: [DatePipe, MatPaginator],
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
    this.installmentStore.loadAllPagination({
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize,
    });
  }
}
