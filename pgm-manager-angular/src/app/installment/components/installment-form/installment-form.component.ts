import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { badges, secretaries } from '../../../customer/data/secretaries';
import { CustomerModel } from '../../../customer/model/customer.model';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { RespInstallmentByCustomerIdDTO } from '../../dto/resp-installment-by-customer-idDTO';
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
  protected inputInstallment = input<RespInstallmentByCustomerIdDTO | null>(
    null,
  );
  protected readonly listSecretaries = secretaries;
  protected readonly listBadges = badges;
  protected installmentStore = inject(InstallmentStore);
  protected customerInfo!: CustomerModel;
  //
  protected readonly formUtilService = inject(FormUtilsService);
  private readonly fb = inject(NonNullableFormBuilder);
  // formulário
  protected formInstallment = this.fb.group({
    installment: this.fb.group({
      secretary: ['', [Validators.required]],
      badge: ['', [Validators.required]],
    }),
  });
  private router = inject(Router);

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
      this.router.navigate(['/installments']).then();
    }
    this.formInstallment.markAllAsTouched();
  }
}
