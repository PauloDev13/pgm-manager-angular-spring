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

import { TSearchQuery } from '../../shared/types/shared.type';
import { ReqCreateCustomerDTO } from '../dto/req-create-customerDTO';
import { CustomerService } from '../service/customer.service';
import { TCustomerStoreState } from '../types/customer.type';

const initialCustomerStoreState: TCustomerStoreState = {
  customer: null,
  listCustomers: [],
  query: {
    page: 0,
    size: 10,
  },
  searchQuery: {
    query: '',
    page: 0,
    size: 10,
  },
  loaded: false,
  totalElements: 0,
  err: null,
};

export const CustomerStore = signalStore(
  { providedIn: 'root' },

  withState<TCustomerStoreState>(initialCustomerStoreState),
  withComputed(store => ({
    criteria: computed(() => store.searchQuery),
  })),
  withMethods((store, customerService = inject(CustomerService)) => ({
    updateFilter(criteria: Partial<TSearchQuery>) {
      patchState(store, { searchQuery: criteria });
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
                  });
                }
              },
            }),
          );
        }),
      ),
    ),
    loadSearchPagination: rxMethod<Partial<TSearchQuery>>(
      pipe(
        debounceTime(300),
        tap(() => patchState(store, { loaded: true })),
        distinctUntilChanged(),
        switchMap(criteria => {
          return customerService.loadSearchPagination(criteria);
        }),
        tapResponse({
          next: ({ customers, totalElements }) => {
            patchState(store, {
              listCustomers: customers,
              loaded: false,
              totalElements,
            });
          },
          error: (errorResp: HttpErrorResponse) =>
            patchState(store, {
              err: `Erro ao buscar dados. CODE: ${errorResp.status}`,
              loaded: false,
            }),
        }),
      ),
    ),
  })),
  withHooks({
    onInit({ loadSearchPagination, searchQuery }) {
      loadSearchPagination(searchQuery);
    },
  }),
);
