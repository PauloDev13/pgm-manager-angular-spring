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
import { debounceTime, pipe, switchMap } from 'rxjs';

import {
  InstallmentStore,
  TPageSize,
} from '../../installment/store/installment.store';
import { TSearchFilter, UtilService } from '../../shared/service/util.service';
import { ReqCreateCustomerDTO } from '../dto/req-create-customerDTO';
import { CustomerListModel } from '../model/customer-list.model';
import { CustomerService } from '../service/customer.service';

type TCustomerStoreState = {
  customer: ReqCreateCustomerDTO | null;
  listCustomers: CustomerListModel[];
  query: TPageSize;
  searchFilter: TSearchFilter;
  totalElements: number;
  err: string | null;
};

const initialCustomerStoreState: TCustomerStoreState = {
  customer: null,
  listCustomers: [],
  query: { page: 0, size: 10 },
  searchFilter: { search: '', page: 0, size: 10 },
  totalElements: 0,
  err: null,
};

export const CustomerStore = signalStore(
  { providedIn: 'root' },

  withState<TCustomerStoreState>(initialCustomerStoreState),
  withComputed(store => ({
    criteria: computed(() => ({
      search: store.searchFilter.search,
      page: store.searchFilter.page,
      size: store.searchFilter.size,
    })),
  })),
  withMethods(
    (
      store,
      customerService = inject(CustomerService),
      utilService = inject(UtilService),
      installmentStore = inject(InstallmentStore),
    ) => ({
      updateFilter(searchFilter: TSearchFilter) {
        patchState(store, { searchFilter });
      },
      create: rxMethod<ReqCreateCustomerDTO>(
        pipe(
          switchMap((request: ReqCreateCustomerDTO) => {
            return customerService.createCustomer(request).pipe(
              tapResponse({
                next: customer => {
                  const updatedCustomer = [...store.listCustomers(), customer];

                  patchState(store, {
                    customer,
                    listCustomers: updatedCustomer,
                    err: null,
                  });
                  // atualiza lista de installments
                  installmentStore.loadAllPagination(store.query);
                },
                error: (err: HttpErrorResponse) => {
                  if (err.error === 'Duplicate constraint') {
                    patchState(store, {
                      customer: null,
                      listCustomers: [],
                      err: err.message,
                    });
                  } else {
                    patchState(store, {
                      err: err.error,
                      customer: null,
                    });
                  }
                },
              }),
            );
          }),
        ),
      ),
      loadAllPagination: rxMethod<{ page: number; size: number }>(
        pipe(
          switchMap(({ page, size }) =>
            customerService.loadPagination(page, size).pipe(
              tapResponse({
                next: resp => {
                  patchState(store, {
                    listCustomers: resp.customers,
                    totalElements: resp.totalElements,
                  });
                },
                error: (errorResp: HttpErrorResponse) =>
                  patchState(store, {
                    err: `Erro ao buscar dados. CODE: ${errorResp.status}`,
                  }),
              }),
            ),
          ),
        ),
      ),
      loadSearchPagination: rxMethod<TSearchFilter>(
        pipe(
          debounceTime(300),
          switchMap(filter =>
            utilService.loadSearchPagination({
              search: filter.search,
              page: filter.page,
              size: filter.size,
            }),
          ),
          tapResponse({
            next: resp => {
              patchState(store, {
                listCustomers: resp.customers,
                totalElements: resp.totalElements,
              });
            },
            error: (errorResp: HttpErrorResponse) =>
              patchState(store, {
                err: `Erro ao buscar dados. CODE: ${errorResp.status}`,
              }),
          }),
        ),
      ),
    }),
  ),
  withHooks({
    onInit({ loadAllPagination, query, loadSearchPagination, searchFilter }) {
      loadAllPagination(query);
      loadSearchPagination(searchFilter);
    },
  }),
);
