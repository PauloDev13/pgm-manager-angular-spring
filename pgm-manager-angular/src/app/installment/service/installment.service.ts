import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';

import { RespCreateInstallmentDTO } from '../dto/resp-create-installmentDTO';
import { RespInstallmentByCustomerIdDTO } from '../dto/resp-installment-by-customer-idDTO';
import { RespInstallmentPageDTO } from '../dto/resp-installment-pageDTO';
import { InstallmentListModel } from '../model/installment-list.model';

@Injectable({
  providedIn: 'root',
})
export class InstallmentService {
  private readonly baseUrlApi = 'http://localhost:8081/api/installments';
  private readonly http = inject(HttpClient);

  loadAll() {
    return this.http.get<RespCreateInstallmentDTO[]>(this.baseUrlApi);
  }

  loadAllPagination(page: number = 0, size: number = 10) {
    return this.http
      .get<RespInstallmentPageDTO>(`${this.baseUrlApi}/pagination`, {
        params: { page, size },
      })
      .pipe(first());
  }

  getInstallmentByCustomerId(customerId: number) {
    return this.http.get<RespInstallmentByCustomerIdDTO>(
      `${this.baseUrlApi}/customer_id/${customerId}/installment`,
    );
  }

  updateStatus(id: number) {
    return this.http.put<InstallmentListModel>(
      `${this.baseUrlApi}/${id}/status`,
      {},
    );
  }
}
