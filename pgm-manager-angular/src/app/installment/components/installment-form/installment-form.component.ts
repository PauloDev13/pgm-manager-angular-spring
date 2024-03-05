import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-installment-form',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './installment-form.component.html',
  styleUrl: './installment-form.component.scss'
})
export class InstallmentFormComponent {
  protected formInstallment = this.fb.group({
    customer: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      document: ['', [Validators.required, Validators.minLength(11)]],
    }),
    installment: this.fb.group({
      secretary: ['', [Validators.required]],
      badge: ['', [Validators.required]],
    }),
  });

}
