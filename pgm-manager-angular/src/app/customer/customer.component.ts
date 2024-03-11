import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { FormUtilsService } from '../shared/form/form-utils.service';
import { UtilService } from '../shared/service/util.service';
import { CustomerStore } from './store/custumer.store';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export default class CustomerComponent {
  // injectables
  protected readonly formUtilService = inject(FormUtilsService);
  protected readonly fb = inject(NonNullableFormBuilder);
  protected readonly utilService = inject(UtilService);
  protected readonly customerStore = inject(CustomerStore);
  // Variables
  protected readonly err = this.customerStore.err();
  // form customer
  protected formCustomer = this.fb.group({
    customer: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      document: ['', [Validators.required, Validators.minLength(11)]],
    }),
    installment: this.fb.group({
      secretary: ['', [Validators.required]],
      badge: ['', [Validators.required]],
      finished: [false],
    }),
  });
  private readonly route = inject(Router);

  onSubmit() {
    if (this.formCustomer.valid) {
      const { customer } = this.formCustomer.getRawValue();
      const { installment } = this.formCustomer.getRawValue();

      this.customerStore.create({ ...customer, installment });

      console.log('CUSTOMER ERROR', this.customerStore);

      if (this.customerStore.customer()?.document !== customer.document) {
        this.route.navigate(['/installments']).then(() => {
          console.log(`${customer.name} cadastrado(a) com sucesso`);
        });

        this.formCustomer.reset();
      }
    }

    this.formCustomer.markAllAsTouched();
  }
}
