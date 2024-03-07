import { Component, inject, input } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { badges, secretaries } from '../../../customer/data/secretaries';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { RespInstallmentByCustomerIdDTO } from '../../dto/resp-installment-by-customer-idDTO';
import { InstallmentStore } from '../../store/installment.store';

@Component({
  selector: 'app-installment-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './installment-form.component.html',
  styleUrl: './installment-form.component.scss',
})
export class InstallmentFormComponent {
  protected inputInstallment = input<RespInstallmentByCustomerIdDTO | null>(
    null,
  );
  protected readonly listSecretaries = secretaries;
  protected readonly listBadges = badges;
  protected installmentStore = inject(InstallmentStore);
  protected customerInfo = this.installmentStore.customerInfo;
  // protected customerInfo = this.installmentStore.customerInfo;
  protected readonly formUtilService = inject(FormUtilsService);
  private readonly fb = inject(NonNullableFormBuilder);
  // formulário
  protected formInstallment = this.fb.group({
    installment: this.fb.group({
      secretary: ['', [Validators.required]],
      badge: ['', [Validators.required]],
    }),
  });

  onSubmit() {}
}
