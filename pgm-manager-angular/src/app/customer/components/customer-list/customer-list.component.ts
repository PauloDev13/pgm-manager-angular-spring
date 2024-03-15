import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { SearchComponent } from '../../../core/components/search/search.component';
import { InstallmentStore } from '../../../installment/store/installment.store';
import { CustomerListModel } from '../../model/customer-list.model';
import { CustomerStore } from '../../store/custumer.store';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [DatePipe, MatPaginator, ReactiveFormsModule, SearchComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent implements OnInit {
  //Stores
  protected readonly customerStore = inject(CustomerStore);
  protected readonly installmentStore = inject(InstallmentStore);
  protected readonly router = inject(Router);
  // Variables
  protected pageIndex: number = 0;
  protected pageSize: number = 10;

  ngOnInit() {
    this.refresh();
  }

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
      alert(`(${customer.name.toUpperCase()}) ESTÁ EM ATENDIMENTO`);
    } else {
      this.router.navigate(['/installment'], { state: customer }).then();
    }
  }
}
