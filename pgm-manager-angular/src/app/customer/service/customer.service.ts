import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { ReqCreateCustomerDTO } from '../dto/req-create-customerDTO';
import { RespCreateCustomerDTO } from '../dto/resp-create-customerDTO';
import {first} from "rxjs";
import {RespInstallmentPageDTO} from "../../installment/dto/resp-installment-pageDTO";
import {RespCustomerPageDTO} from "../dto/resp-customer-pageDTO";

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrlApi = 'http://localhost:8081/api/customers';
  private http = inject(HttpClient);

  createCustomer(customer: ReqCreateCustomerDTO) {
    return this.http.post<RespCreateCustomerDTO>(this.baseUrlApi, customer);
  }

  loadPagination(page: number = 0, size: number = 10) {
    return this.http.get<RespCustomerPageDTO>(`${this.baseUrlApi}/pagination`, {
      params: { page, size }
    }).pipe(first());
  }
}
