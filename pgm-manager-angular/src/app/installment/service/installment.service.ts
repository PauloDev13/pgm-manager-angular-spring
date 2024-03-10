import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';

import { RespCreateInstallmentDTO } from '../dto/resp-create-installmentDTO';
import { RespInstallmentPageDTO } from '../dto/resp-installment-pageDTO';
import { InstallmentListModel } from '../model/installment-list.model';
import { TNewInstallment } from '../store/installment.store';

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

  createInstallmentByCustomer(newInstallment: TNewInstallment) {
    return this.http.post<RespCreateInstallmentDTO>(
      `${this.baseUrlApi}`,
      newInstallment,
    );
  }

  updateStatus(id: number) {
    return this.http.put<InstallmentListModel>(
      `${this.baseUrlApi}/${id}/status`,
      {},
    );
  }
}
