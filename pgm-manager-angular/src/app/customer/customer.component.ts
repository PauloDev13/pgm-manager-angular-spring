import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { badges, secretaries } from './data/secretaries';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export default class CustomerComponent {
  protected readonly listSecretaries = secretaries;
  protected readonly listBadges = badges;

  private readonly fb = inject(NonNullableFormBuilder);

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

  onSubmit() {
    if (this.formCustomer.valid) {
      const { customer } = this.formCustomer.getRawValue();
      const { installment } = this.formCustomer.getRawValue();
      const data = { ...customer, ...installment };
      console.log('VALUES CUSTOMER', data);
      this.formCustomer.reset();
    }
  }
}
