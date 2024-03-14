import { Component, inject, input } from '@angular/core';

import { CustomerStore } from '../../../customer/store/custumer.store';
import { InstallmentStore } from '../../../installment/store/installment.store';
import { TSearchQuery } from '../../../shared/types/shared.type';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  option = input.required<string>();
  protected readonly customerStore = inject(CustomerStore);
  protected readonly installmentStore = inject(InstallmentStore);

  updateFilter(criteria: Partial<TSearchQuery>) {
    if (this.option() === 'installment') {
      this.installmentStore.loadSearchPagination(criteria);
    } else {
      this.customerStore.loadSearchPagination(criteria);
    }
  }
}
