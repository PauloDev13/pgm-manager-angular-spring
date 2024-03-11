import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';

import { ReqCreateCustomerDTO } from '../dto/req-create-customerDTO';
import { RespCustomerPageDTO } from '../dto/resp-customer-pageDTO';
import { CustomerListModel } from '../model/customer-list.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  // Injectables
  protected readonly http = inject(HttpClient);
  // Variables
  protected readonly baseUrlApi = 'http://localhost:8081/api/customers';

  createCustomer(customer: ReqCreateCustomerDTO) {
    return this.http.post<CustomerListModel>(this.baseUrlApi, customer);
  }

  loadPagination(page: number = 0, size: number = 10) {
    return this.http
      .get<RespCustomerPageDTO>(`${this.baseUrlApi}/pagination`, {
        params: { page, size },
      })
      .pipe(first());
  }
}
