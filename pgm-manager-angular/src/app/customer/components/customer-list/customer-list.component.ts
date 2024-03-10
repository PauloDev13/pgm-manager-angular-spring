import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { InstallmentStore } from '../../../installment/store/installment.store';
import { CustomerListModel } from '../../model/customer-list.model';
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
  protected totalElements = this.customerStore.totalElements();
  protected pageIndex: number = 0;
  protected pageSize: number = 10;
  private router = inject(Router);

  refresh(
    pageEvent: PageEvent = {
      length: this.totalElements,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    },
  ) {
    this.customerStore.loadAllPagination({
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize,
    });
    this.totalElements = this.customerStore.totalElements();
  }

  // onAddInstallment(id: number, name: string, document: string) {
  onAddInstallment(customer: CustomerListModel) {
    const result = this.installmentStore
      .listInstallments()
      .some(resp => customer.id === resp.customer.id && !resp.finished);

    if (result) {
      alert(
        `(${customer.name.toUpperCase()}) ESTÁ EM ATENDIMENTO NA SEC. ${this.installmentStore
          .installment()
          .secretary.toUpperCase()}`,
      );
    } else {
      this.router.navigate(['/installment'], { state: customer }).then();
    }
  }
}
