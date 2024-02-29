import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { RespCreateInstallmentDTO } from '../dto/resp-create-installmentDTO';

@Injectable({
  providedIn: 'root',
})
export class InstallmentService {
  private readonly baseUrlApi = 'http://localhost:8081/api/installments';
  private readonly http = inject(HttpClient);

  loadAll() {
    return this.http
      .get<RespCreateInstallmentDTO[]>(this.baseUrlApi)
      .pipe(tap(resp => console.log(resp)));
  }
}
