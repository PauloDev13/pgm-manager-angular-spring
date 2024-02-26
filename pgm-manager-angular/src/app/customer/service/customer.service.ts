import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { ReqCreateCustomerDTO } from '../dto/req-create-customerDTO';
import { RespCreateCustomerDTO } from '../dto/resp-create-customerDTO';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrlApi = 'http://localhost:8081/api/customers';
  private http = inject(HttpClient);

  createCustomer(customer: ReqCreateCustomerDTO) {
    return this.http.post<RespCreateCustomerDTO>(this.baseUrlApi, customer);
  }
}
