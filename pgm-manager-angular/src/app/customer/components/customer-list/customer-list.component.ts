import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { InstallmentStore } from '../../../installment/store/installment.store';
import { TSearchFilter } from '../../../shared/service/util.service';
import { CustomerListModel } from '../../model/customer-list.model';
import { CustomerStore } from '../../store/custumer.store';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [DatePipe, MatPaginator, ReactiveFormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent {
  //Stores
  protected readonly customerStore = inject(CustomerStore);
  protected readonly installmentStore = inject(InstallmentStore);
  protected readonly router = inject(Router);
  // Variables
  protected listCustomers = this.customerStore.listCustomers;
  protected totalElements = this.customerStore.totalElements();
  protected searchFilter = this.customerStore.searchFilter;
  //
  protected pageIndex: number = 0;
  protected pageSize: number = 10;
  protected searchField = new FormControl();

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
      alert(`(${customer.name.toUpperCase()}) ESTÁ EM ATENDIMENTO`);
    } else {
      this.router.navigate(['/installment'], { state: customer }).then();
    }
  }

  updateSearch(searchFilter: TSearchFilter) {
    this.customerStore.updateFilter(searchFilter);
  }

  teste(event: any) {
    console.log(event);
  }
}
