import { HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';

import { ReqCreateCustomerDTO } from '../dto/req-create-customerDTO';
import { CustomerService } from '../service/customer.service';

type ICustomerStoreState = {
  customer: ReqCreateCustomerDTO | null;
  err: string | null;
};

const initialCustomerStoreState: ICustomerStoreState = {
  customer: null,
  err: null,
};

export const CustomerStore = signalStore(
  { providedIn: 'root' },

  withState(initialCustomerStoreState),

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
      };
    },
  ),
);
