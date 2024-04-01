import { formatCurrency } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { NotifierService } from '../../shared/service/notifier.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  protected readonly formatCurrency = formatCurrency;
  protected readonly fb = inject(NonNullableFormBuilder);
  protected notifierSnackbar = inject(NotifierService);
  protected readonly route = inject(Router);

  protected formLogin = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.formLogin.valid) {
      console.log('FORM', this.formLogin.getRawValue());
    }
    this.formLogin.markAllAsTouched();
  }
}
