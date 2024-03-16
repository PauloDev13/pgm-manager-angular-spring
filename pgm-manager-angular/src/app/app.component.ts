import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { CustomerStore } from './customer/store/custumer.store';
import { InstallmentStore } from './installment/store/installment.store';
import { LoaderSpinnerComponent } from './shared/components/loader-spinner/loader-spinner.component';
import { ScreenSizeDirective } from './shared/directives/screen-size.directive';
import { ScreenSizeSignal } from './shared/signals/screen-size.signal';
import { SideBarSignal } from './shared/signals/sidebar.signal';
import { TSearchQuery } from './shared/types/shared.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    MatButtonModule,
    MatSidenavModule,
    ScreenSizeDirective,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    LoaderSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pgm atendimento';

  sidebarSignal = inject(SideBarSignal);
  screenSignal = inject(ScreenSizeSignal);
  currentScreen = '';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  protected customerStore = inject(CustomerStore);
  protected installmentStore = inject(InstallmentStore);
  protected router = inject(Router);

  computeSize(size: string) {
    this.currentScreen = size;
  }

  updateFilterCustomer(criteria: TSearchQuery) {
    this.customerStore.updateFilter(criteria);
    this.router.navigate(['/customers']).then();
  }
  updateFilterInstallment(criteria: TSearchQuery) {
    this.installmentStore.updateFilter(criteria);
    this.router.navigate(['/installments']).then();
  }
}
