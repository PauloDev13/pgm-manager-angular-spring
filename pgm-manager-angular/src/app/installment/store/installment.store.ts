import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';

import { TPageAndSize } from '../../shared/types/shared.type';
import { ReqCreateInstallmentDTO } from '../dto/req-create-installmentDTO';
import { InstallmentListModel } from '../model/installment-list.model';
import { InstallmentService } from '../service/installment.service';
import { TInstallmentState, TNewInstallment } from '../types/installment.type';

const initialInstallmentStoreState: TInstallmentState = {
  installment: {} as ReqCreateInstallmentDTO,
  listInstallments: [] as InstallmentListModel[],
  query: { page: 0, size: 10 },
  totalElements: 0,
  err: null,
};

export const InstallmentStore = signalStore(
  { providedIn: 'root' },

  withState<TInstallmentState>(initialInstallmentStoreState),

  withMethods(
    (store, installmentService = inject(InstallmentService)) => ({
      loadAll: rxMethod<void>(
        pipe(
          switchMap(() => installmentService.loadAll()),
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
      loadAllPagination: rxMethod<TPageAndSize>(
        pipe(
          switchMap(({ page, size }) =>
            installmentService.loadAllPagination(page, size),
          ),
          tapResponse({
            next: resp => {
              let installment;

              resp.installments.map(item => {
                installment = item;
              });

              patchState(store, {
                installment,
                listInstallments: resp.installments,
                totalElements: resp.totalElements,
                err: null,
              });
            },
            error: (err: HttpErrorResponse) =>
              patchState(store, {
                err: 'Erro ao buscar dados. Code: ' + err.status,
              }),
          }),
        ),
      ),
      updateStatus: rxMethod<{ id: number }>(
        pipe(
          // atualiza o status
          switchMap(({ id }) => installmentService.updateStatus(id)),
          tapResponse({
            next: respInstallment => {
              const updatedInstallment = store
                .listInstallments()
                .map(dataInstallment => {
                  return dataInstallment.id === respInstallment.id
                    ? respInstallment
                    : dataInstallment;
                });
              patchState(store, {
                installment: respInstallment,
                listInstallments: updatedInstallment,
                err: null,
              });
            },
            error: (errorRes: HttpErrorResponse) =>
              patchState(store, {
                err: `Erro ao atualizar status. CODE: ${errorRes.status}`,
              }),
          }),
        ), // fim do pipe
      ), // fim updateStatus
      createInstallmentByCustomer: rxMethod<{
        newInstallment: TNewInstallment;
      }>(
        pipe(
          switchMap(({ newInstallment }) =>
            installmentService.createInstallmentByCustomer(newInstallment),
          ),
          tapResponse({
            next: installment => {
              const installmentsUpdated = [
                ...store.listInstallments(),
                installment,
              ];
              patchState(store, {
                installment,
                listInstallments: installmentsUpdated,
                err: null,
              });
            },
            error: (errorResp: HttpErrorResponse) =>
              patchState(store, {
                err: `Erro ao criar atendimento. CODE: ${errorResp.status}`,
              }),
          }),
        ),
      ), // fim create installment
    }), //fim methods
  ), //final methods
  withHooks({
    onInit({ loadAllPagination, query }) {
      loadAllPagination(query);
    },
  }),
); //final rotina
