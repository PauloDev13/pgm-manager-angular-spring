import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

import { TPageAndSize, TSearchQuery } from '../../shared/types/shared.type';
import { ReqCreateInstallmentDTO } from '../dto/req-create-installmentDTO';
import { InstallmentListModel } from '../model/installment-list.model';
import { InstallmentService } from '../service/installment.service';
import {
  TInstallmentFilter,
  TInstallmentState,
  TNewInstallment,
} from '../types/installment.type';

const initialInstallmentStoreState: TInstallmentState = {
  installment: {} as ReqCreateInstallmentDTO,
  listInstallments: [] as InstallmentListModel[],
  filter: 'pending',
  searchQuery: {
    query: '',
    status: false,
    page: 0,
    size: 10,
  },
  loaded: false,
  totalElements: 0,
  err: null,
};

export const InstallmentStore = signalStore(
  { providedIn: 'root' },

  withState<TInstallmentState>(initialInstallmentStoreState),

  withMethods(
    (store, installmentService = inject(InstallmentService)) => ({
      updateFilter(criteria: Partial<TSearchQuery>) {
        patchState(store, { searchQuery: criteria });
      },
      updateInstallmentFilter(filter: TInstallmentFilter) {
        patchState(store, { filter });
      },
      loadSearchPagination: rxMethod<Partial<TSearchQuery>>(
        pipe(
          debounceTime(300),
          tap(() => patchState(store, { loaded: true })),
          distinctUntilChanged(),
          switchMap(criteria =>
            installmentService.loadSearchPagination(criteria),
          ),
          tapResponse({
            next: ({ installments, totalElements }) => {
              patchState(store, { loaded: true });
              patchState(store, {
                listInstallments: installments,
                totalElements,
                loaded: false,
              });
            },
            error: (err: HttpErrorResponse) =>
              patchState(store, {
                err: 'Erro ao buscar dados. Code: ' + err.status,
                loaded: false,
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
              const updatedInstallments = store
                .listInstallments()
                .map(dataInstallment => {
                  return dataInstallment.id === respInstallment.id
                    ? respInstallment
                    : dataInstallment;
                });
              patchState(store, {
                installment: respInstallment,
                listInstallments: updatedInstallments,
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
          tap(() => patchState(store, { loaded: true })),
          switchMap(({ newInstallment }) =>
            installmentService.createInstallmentByCustomer(newInstallment),
          ),
          tapResponse({
            next: installment => {
              const UpdatedInstallments = [
                ...store.listInstallments(),
                installment,
              ];
              patchState(store, {
                installment,
                listInstallments: UpdatedInstallments,
                loaded: false,
                err: null,
              });
            },
            error: (errorResp: HttpErrorResponse) =>
              patchState(store, {
                err: `Erro ao criar atendimento. CODE: ${errorResp.status}`,
                loaded: false,
              }),
          }),
        ),
      ), // fim create installment
    }), //fim methods
  ), //final methods
  withComputed(store => ({
    // código não usado - serve como exemplo
    filteredInstallments: computed(() => {
      const installments = store.listInstallments();
      switch (store.filter()) {
        case 'pending':
          return installments.filter(resp => !resp.finished);
        case 'finished':
          return installments.filter(resp => resp.finished);
      }
    }),
  })),
  withHooks({
    onInit({ loadSearchPagination, searchQuery }) {
      loadSearchPagination(searchQuery);
    },
  }),
); //final rotina
