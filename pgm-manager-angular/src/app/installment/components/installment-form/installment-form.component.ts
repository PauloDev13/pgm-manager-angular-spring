import { Component, inject, OnInit } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerModel } from '../../../customer/model/customer.model';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { UtilService } from '../../../shared/service/util.service';
import { InstallmentStore } from '../../store/installment.store';

type TNewInstallment = {
  secretary: string;
  badge: string;
  customer: {
    id: number;
  };
};

@Component({
  selector: 'app-installment-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './installment-form.component.html',
  styleUrl: './installment-form.component.scss',
})
export class InstallmentFormComponent implements OnInit {
  // Stores
  protected readonly installmentStore = inject(InstallmentStore);
  // variables
  protected customerInfo!: CustomerModel;
  // Injectables
  protected readonly formUtilService = inject(FormUtilsService);
  protected readonly utilService = inject(UtilService);
  protected readonly router = inject(Router);
  protected readonly fb = inject(NonNullableFormBuilder);
  // form
  protected formInstallment = this.fb.group({
    installment: this.fb.group({
      secretary: ['', [Validators.required]],
      badge: ['', [Validators.required]],
    }),
  });

  ngOnInit() {
    this.customerInfo = history.state;
  }

  onSubmit() {
    if (this.formInstallment.valid) {
      const { secretary, badge } =
        this.formInstallment.controls.installment.getRawValue();
      const newInstallment: TNewInstallment = {
        secretary,
        badge,
        customer: {
          id: this.customerInfo.id!,
        },
      };
      this.installmentStore.createInstallmentByCustomer({ newInstallment });
      this.router
        .navigate(['/installments'])
        .then(() =>
          console.log(`Atendimento criado para: (${this.customerInfo.name}`),
        );
    }
    this.formInstallment.markAllAsTouched();
  }
}
