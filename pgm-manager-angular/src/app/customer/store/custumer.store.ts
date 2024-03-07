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

import { InstallmentStore } from '../../installment/store/installment.store';
import { ReqCreateCustomerDTO } from '../dto/req-create-customerDTO';
import { CustomerListModel } from '../model/customer-list.model';
import { CustomerService } from '../service/customer.service';

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
      installmentStore = inject(InstallmentStore),
    ) => {
      return {
        create: rxMethod<ReqCreateCustomerDTO>(
          pipe(
            switchMap((request: ReqCreateCustomerDTO) => {
              return customerService.createCustomer(request).pipe(
                tapResponse({
                  next: customer => {
                    const updatedCustomer = [
                      ...store.listCustomers(),
                      customer,
                    ];
                    patchState(store, {
                      listCustomers: updatedCustomer,
                      err: null,
                    });
                    // atualiza lista de installments
                    installmentStore.loadAllPagination({ page: 0, size: 10 });
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
      };
    },
  ),
  withHooks({
    onInit({ loadAllPagination }) {
      loadAllPagination({ page: 0, size: 10 });
    },
  }),
);
