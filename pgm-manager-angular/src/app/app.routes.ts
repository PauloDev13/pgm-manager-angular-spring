import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'customer',
    loadComponent: () => import('./customer/customer.component'),
  },
  {
    path: 'customers',
    loadComponent: () =>
      import(
        './customer/components/customer-list/customer-list.component'
      ).then(c => c.CustomerListComponent),
  },
  {
    path: 'installment',
    loadComponent: () =>
      import(
        './installment/components/installment-form/installment-form.component'
      ).then(c => c.InstallmentFormComponent),
  },
  {
    path: 'installments',
    loadComponent: () =>
      import(
        './installment/components/installment-list/installment-list.component'
      ),
  },
];
