import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { InstallmentStore } from '../../../installment/store/installment.store';
import { CustomerStore } from '../../store/custumer.store';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [DatePipe, MatPaginator],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent {
  protected readonly customerStore = inject(CustomerStore);
  protected readonly installmentStore = inject(InstallmentStore);
  //
  protected listCustomers = this.customerStore.listCustomers;
  protected customerInfo = this.installmentStore.customerInfo;
  protected error = this.installmentStore.err;
  protected totalElements = this.customerStore.totalElements;
  protected pageIndex: number = 0;
  protected pageSize: number = 10;
  private router = inject(Router);

  refresh(
    pageEvent: PageEvent = {
      length: this.totalElements(),
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    },
  ) {
    this.customerStore.loadAllPagination({
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize,
    });
  }

  onAddInstallment(id: number) {
    console.log('ID', id);
    this.installmentStore.installmentByCustomerId({ id });
    console.log('ERROR NO METHOD', this.error());
    console.log('CUSTOMER NO METHOD', this.customerInfo());
    this.router.navigate(['/installment']).then();
  }
}
