import { inject, Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

import { CustomerStore } from '../../customer/store/custumer.store';

@Injectable({
  providedIn: 'root',
})
export class CustomAsynchronousValidationService {
  private readonly customerStore = inject(CustomerStore);
  isCpfExists(): ValidatorFn {
    return (control: AbstractControl): Validators => {
      const cpf: string = control.value;

      const isExists: boolean = this.customerStore
        .listCustomers()
        .some(resp => resp.document === cpf);

      if (isExists) {
        return { isCpfExists: true };
      } else {
        return false;
      }
    };
  }
  // private customerService = inject(CustomerService);

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
