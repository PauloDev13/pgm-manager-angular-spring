import { HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';

import { ReqCreateCustomerDTO } from '../dto/req-create-customerDTO';
import { CustomerService } from '../service/customer.service';
import {CustomerListModel} from "../model/customer-list.model";

type ICustomerStoreState = {
  customer: ReqCreateCustomerDTO | null;
  listCustomers: CustomerListModel[];
  totalElements: number;
  err: string | null;
};

const initialCustomerStoreState: ICustomerStoreState = {
  customer: null,
  listCustomers: [],
  totalElements: 0,
  err: null,
};

export const CustomerStore = signalStore(
  { providedIn: 'root' },

  withState<ICustomerStoreState>(initialCustomerStoreState),

  withMethods(
    (
      store,
      customerService = inject(CustomerService),
      destroyRef = inject(DestroyRef),
    ) => {
      return {
        create: rxMethod<ReqCreateCustomerDTO>(
          pipe(
            takeUntilDestroyed(destroyRef),
            switchMap((request: ReqCreateCustomerDTO) => {
              return customerService.createCustomer(request).pipe(
                tapResponse({
                  next: customer => {
                    patchState(store, { customer, err: null });
                  },
                  error: (err: HttpErrorResponse) => {
                    if (err.error === 'Duplicate constraint') {
                      patchState(store, {
                        err: 'CPF já cadastrado',
                        customer: null,
                      });
                    } else {
                      patchState(store, { err: err.error, customer: null });
                    }
                  },
                }),
              );
            }),
          ),
        ),
        loadAllPagination: rxMethod<{ page: number, size: number}>(
          pipe(
            switchMap(({ page, size}) => customerService.loadPagination( page, size)
              .pipe(
                tapResponse({
                  next: (resp) => {
                    patchState(store, {
                      listCustomers: resp.customers,
                      totalElements: resp.totalElements,
                    })
                  },
                  error: (errorResp: HttpErrorResponse) => patchState(store, {
                    err: `Erro ao buscar dados. CODE: ${errorResp.status}`
                  })
                })
              )
            )
          )
        )
      };
    },
  ),
);
