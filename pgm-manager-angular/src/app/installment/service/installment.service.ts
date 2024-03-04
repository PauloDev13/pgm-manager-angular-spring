import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';

import { RespCreateInstallmentDTO } from '../dto/resp-create-installmentDTO';
import { RespInstallmentPageDTO } from '../dto/resp-installment-pageDTO';

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

  updateStatus(id: number) {
    return this.http.put<void>(`${this.baseUrlApi}/${id}/status`, {});
  }
}
