import { HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';

import { ReqCreateInstallmentDTO } from '../dto/req-create-installmentDTO';
import { InstallmentListModel } from '../model/installment-list.model';
import { InstallmentService } from '../service/installment.service';

type IInstallmentState = {
  installment: ReqCreateInstallmentDTO | null;
  listInstallments: InstallmentListModel[];
  err: string | null;
};

const initialInstallmentStoreState: IInstallmentState = {
  installment: null,
  listInstallments: [],
  err: null,
};

export const installmentStore = signalStore(
  { providedIn: 'root' },

  withState<IInstallmentState>(initialInstallmentStoreState),

  withMethods(
    (
      store,
      installmentService = inject(InstallmentService),
      destroyRef = inject(DestroyRef),
    ) => ({
      loadAll: rxMethod<void>(
        pipe(
          takeUntilDestroyed(destroyRef),
          switchMap(() =>
            installmentService.loadAll().pipe(
              tapResponse({
                next: listInstallments => {
                  patchState(store, { listInstallments });
                },
                error: (err: HttpErrorResponse) =>
                  patchState(store, {
                    err: 'Erro ao buscar dados. Code: ' + err.status,
                  }),
              }),
            ),
          ),
        ),
      ),
    }),
  ),
);
