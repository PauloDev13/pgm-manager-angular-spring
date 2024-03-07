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
  protected store = inject(InstallmentStore);
  protected totalElements = this.store.totalElements();
  protected listInstallments = this.store.listInstallments;
  protected pageIndex: number = 0;
  protected pageSize: number = 10;

  // constructor() {
  //   effect(() => {
  //     this.store.loadAllPagination({
  //       page: this.pageIndex,
  //       size: this.pageSize,
  //     });
  //   });
  // }

  refresh(
    pageEvent: PageEvent = {
      length: this.totalElements,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    },
  ) {
    this.store.loadAllPagination({
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize,
    });
    this.totalElements = this.store.totalElements();
  }
}
