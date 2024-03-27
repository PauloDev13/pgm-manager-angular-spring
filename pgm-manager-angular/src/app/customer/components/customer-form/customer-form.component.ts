import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { InstallmentStore } from '../../../installment/store/installment.store';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { NotifierService } from '../../../shared/service/notifier.service';
import { UtilService } from '../../../shared/service/util.service';
import { CustomAsynchronousValidationService } from '../../../shared/utils/custom-asynchronous- validation.service';
import { CustomerStore } from '../../store/custumer.store';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export default class CustomerFormComponent {
  // injectables
  protected readonly formUtilService = inject(FormUtilsService);
  protected readonly asyncValidationService = inject(
    CustomAsynchronousValidationService,
  );
  protected readonly fb = inject(NonNullableFormBuilder);
  protected readonly utilService = inject(UtilService);
  protected readonly customerStore = inject(CustomerStore);
  protected readonly installmentStore = inject(InstallmentStore);
  // form customer
  protected formCustomer = this.fb.group({
    customer: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          this.asyncValidationService.isCpfExists(),
        ],
      ],
    }),
    installment: this.fb.group({
      secretary: ['', [Validators.required]],
      badge: ['', [Validators.required]],
      finished: [false],
    }),
  });
  // Variables
  private notifierSnackbar = inject(NotifierService);
  private readonly route = inject(Router);

  onSubmit() {
    if (this.formCustomer.valid) {
      const { customer } = this.formCustomer.getRawValue();
      const { installment } = this.formCustomer.getRawValue();

      this.customerStore.create({ ...customer, installment });

      this.route.navigate(['/installments']).then(() => {
        // atualiza a lista de atendimentos
        this.installmentStore.loadSearchPagination({
          query: '',
          page: 0,
          size: 10,
        });
        this.notifierSnackbar.showNotification(
          `Usuário ${customer.name.toUpperCase()} cadastrado(a) com sucesso`,
          'OK',
          'success-snackbar',
        );
        // console.log(`Usuário ${customer.name} cadastrado(a) com sucesso`);
      });
    }

    this.formCustomer.markAllAsTouched();
  }
}
