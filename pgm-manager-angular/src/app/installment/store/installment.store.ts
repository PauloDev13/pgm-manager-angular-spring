import {HttpErrorResponse} from '@angular/common/http';
import {DestroyRef, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {tapResponse} from '@ngrx/operators';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';

import {ReqCreateInstallmentDTO} from '../dto/req-create-installmentDTO';
import {InstallmentListModel} from '../model/installment-list.model';
import {InstallmentService} from '../service/installment.service';

type IInstallmentState = {
  installment: ReqCreateInstallmentDTO | null;
  listInstallments: InstallmentListModel[];
  totalElements: number;
  err: string | null;
};

const initialInstallmentStoreState: IInstallmentState = {
  installment: null,
  listInstallments: [],
  totalElements: 0,
  err: null,
};

export const installmentStore = signalStore(
  {providedIn: 'root'},

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
      loadAllPagination: rxMethod<{ page: number; size: number }>(
        pipe(
          takeUntilDestroyed(destroyRef),
          switchMap(({page, size}) =>
            installmentService.loadAllPagination(page, size).pipe(
              tapResponse({
                next: resp => {
                  patchState(store, {
                    listInstallments: resp.installments,
                    totalElements: resp.totalElements,
                  });
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
      updateStatus: rxMethod<{ id: number }> (
        pipe(
          // atualiza o status
          switchMap(({ id }) => installmentService.updateStatus(id)
            .pipe(
              tapResponse({
                next: () => {
                  patchState(store, { err: null });
                },
                error: (errorRes: HttpErrorResponse) => patchState(store, {
                  err: `Erro ao atualizar status. CODE: ${errorRes.status}`
                })
              }),
            )
          ), // fim do switch de atualização
          // busca installment paginado
          switchMap(() => installmentService.loadAllPagination(0, 10)
            .pipe(
              tap({
                next: (resp) => patchState(store, {
                  listInstallments: resp.installments,
                  totalElements: resp.totalElements,
                }),
                error: (errorRes: HttpErrorResponse) =>
                  patchState(store, {
                    err: `Erro ao buscar dados. CODE: ${errorRes.status}`,
                  }),
              })
            )
          ) // fim do switch de busca
        )
      )
    }), //final corpo methods
  ), //final methods
); //final rotina
