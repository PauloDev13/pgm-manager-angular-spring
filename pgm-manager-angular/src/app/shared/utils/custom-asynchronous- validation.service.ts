import { inject, Injectable } from '@angular/core';

import { CustomerService } from '../../customer/service/customer.service';

@Injectable({
  providedIn: 'root',
})
export class CustomAsynchronousValidationService {
  private customerService = inject(CustomerService);

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
