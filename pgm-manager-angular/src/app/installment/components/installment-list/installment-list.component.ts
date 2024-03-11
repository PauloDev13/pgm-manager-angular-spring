import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { CustomerStore } from '../../../customer/store/custumer.store';
import { InstallmentStore } from '../../store/installment.store';

@Component({
  selector: 'app-installment-list',
  standalone: true,
  imports: [DatePipe, MatPaginator],
  templateUrl: './installment-list.component.html',
  styleUrl: './installment-list.component.scss',
})
export default class InstallmentListComponent {
  protected installmentStore = inject(InstallmentStore);
  protected customerStore = inject(CustomerStore);
  //
  protected listInstallments = this.installmentStore.listInstallments;
  protected totalElements = this.installmentStore.totalElements();
  //
  protected pageIndex: number = 0;
  protected pageSize: number = 10;

  refresh(
    pageEvent: PageEvent = {
      length: this.totalElements,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    },
  ) {
    this.installmentStore.loadAllPagination({
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize,
    });
    this.totalElements = this.installmentStore.totalElements();
  }
}
