import { DatePipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { installmentStore } from '../../store/installment.store';

@Component({
  selector: 'app-installment-list',
  standalone: true,
  imports: [DatePipe, MatPaginator],
  templateUrl: './installment-list.component.html',
  styleUrl: './installment-list.component.scss',
})
export default class InstallmentListComponent {
  protected readonly store = inject(installmentStore);
  protected totalElements: number = this.store.totalElements();
  protected pageIndex: number = 0;
  protected pageSize: number = 10;

  constructor() {
    effect(() => {
      this.store.loadAllPagination({
        page: this.pageIndex,
        size: this.pageSize,
      });
    });
  }

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
