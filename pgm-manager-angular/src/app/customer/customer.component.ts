import { JsonPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getState } from '@ngrx/signals';

import { FormUtilsService } from '../shared/form/form-utils.service';
import { badges, secretaries } from './data/secretaries';
import { CustomerStore } from './store/custumer.store';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export default class CustomerComponent {
  protected readonly listSecretaries = secretaries;
  protected readonly listBadges = badges;
  // injectables
  protected readonly formUtilService = inject(FormUtilsService);
  protected readonly customerStore = inject(CustomerStore);
  private readonly fb = inject(NonNullableFormBuilder);
  // form customer
  protected formCustomer = this.fb.group({
    customer: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      document: ['', [Validators.required, Validators.minLength(11)]],
    }),
    installment: this.fb.group({
      secretary: ['', [Validators.required]],
      badge: ['', [Validators.required]],
    }),
  });

  constructor() {
    effect(() => {
      const { customer } = getState(this.customerStore);
      if (customer) {
        alert(`${customer.name} cadastrado(a) com sucesso`);
        this.formCustomer.reset();
      }
    });
  }

  onSubmit() {
    if (this.formCustomer.valid) {
      const { customer } = this.formCustomer.getRawValue();
      const { installment } = this.formCustomer.getRawValue();
      this.customerStore.create({ ...customer, installment });
    }
    this.formCustomer.markAllAsTouched();
  }
}
