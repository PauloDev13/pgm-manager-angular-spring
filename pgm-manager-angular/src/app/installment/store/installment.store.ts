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

import { ReqCreateInstallmentDTO } from '../dto/req-create-installmentDTO';
import { RespInstallmentByCustomerIdDTO } from '../dto/resp-installment-by-customer-idDTO';
import { InstallmentListModel } from '../model/installment-list.model';
import { InstallmentService } from '../service/installment.service';

export type TPageSize = {
  page: number;
  size: number;
};

export type TNewInstallment = {
  secretary: string;
  badge: string;
  customer: {
    id: number;
  };
};

type IInstallmentState = {
  installment: ReqCreateInstallmentDTO;
  listInstallments: InstallmentListModel[];
  customerInfo: RespInstallmentByCustomerIdDTO;
  totalElements: number;
  err: string | null;
};

const initialInstallmentStoreState: IInstallmentState = {
  installment: {} as ReqCreateInstallmentDTO,
  listInstallments: [] as InstallmentListModel[],
  customerInfo: {} as RespInstallmentByCustomerIdDTO,
  totalElements: 0,
  err: null,
};

export const InstallmentStore = signalStore(
  { providedIn: 'root' },

  withState<IInstallmentState>(initialInstallmentStoreState),

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
      loadAllPagination: rxMethod<TPageSize>(
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
    onInit({ loadAllPagination }) {
      loadAllPagination({ page: 0, size: 10 });
    },
  }),
); //final rotina
