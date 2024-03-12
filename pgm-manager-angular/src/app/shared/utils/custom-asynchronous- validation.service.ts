import { inject, Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, map, of, switchMap, tap } from 'rxjs';

import { CustomerService } from '../../customer/service/customer.service';
import { CustomerStore } from '../../customer/store/custumer.store';

@Injectable({
  providedIn: 'root',
})
export class CustomAsynchronousValidationService {
  private customerService = inject(CustomerService);
  private customerStore = inject(CustomerStore);

  isCpfExists(): ValidatorFn {
    return (control: AbstractControl): Validators => {
      return control.valueChanges
        .pipe(debounceTime(300))
        .pipe(
          switchMap((cpf: string) =>
            of(
              this.customerStore
                .listCustomers()
                .some(item => (item.document = cpf)),
            ),
          ),
          tap(t => console.log('PASSOU', t)),
        )
        .pipe(
          map(isExists => {
            return isExists ? { isCpfExists: true } : false;
          }),
        );
    };
  }

  // isCpfExists(): ValidatorFn {
  //   return (control: AbstractControl): Validators => {
  //     return control.valueChanges
  //       .pipe(debounceTime(300))
  //       .pipe(switchMap((cpf: string) => this.customerService.getByCPF(cpf)))
  //       .pipe(
  //         map(isExists => {
  //           return isExists ? { isCpfExists: true } : null;
  //         }),
  //       )
  //       .pipe(first());
  //   };
  // }
}
