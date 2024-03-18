import { DatePipe } from '@angular/common';
import { Component, effect, inject, viewChild } from '@angular/core';
import {
  MatButtonToggle,
  MatButtonToggleChange,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { SearchComponent } from '../../../core/components/search/search.component';
import { LoaderSpinnerComponent } from '../../../shared/components/loader-spinner/loader-spinner.component';
import { TSearchQuery } from '../../../shared/types/shared.type';
import { InstallmentListModel } from '../../model/installment-list.model';
import { InstallmentStore } from '../../store/installment.store';
import { TInstallmentFilter } from '../../types/installment.type';

@Component({
  selector: 'app-installment-list',
  standalone: true,
  imports: [
    DatePipe,
    MatPaginator,
    SearchComponent,
    LoaderSpinnerComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
  ],
  templateUrl: './installment-list.component.html',
  styleUrl: './installment-list.component.scss',
})
export default class InstallmentListComponent {
  // Stores
  protected installmentStore = inject(InstallmentStore);
  // Variables
  protected pageIndex: number = 0;
  protected pageSize: number = 10;
  private filter = viewChild.required(MatButtonToggleGroup);
  private querySearch!: TSearchQuery;

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.installmentStore.filter();
    });
  }

  refresh(
    pageEvent: PageEvent = {
      length: this.installmentStore.totalElements(),
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    },
  ) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;

    if (this.installmentStore.filter() === 'pending') {
      this.updateFilter({
        ...this.querySearch,
        page: pageEvent.pageIndex,
        size: pageEvent.pageSize,
        status: false,
      });
    } else {
      this.updateFilter({
        ...this.querySearch,
        page: pageEvent.pageIndex,
        size: pageEvent.pageSize,
        status: true,
      });
    }
  }

  updateStatus(installment: InstallmentListModel) {
    if (
      confirm(
        `FINALIZAR O ATENDIMENTO PARA: ${installment.customer.name.toUpperCase()}`,
      )
    ) {
      this.installmentStore.updateStatus({ id: installment.id });
      this.updateFilter({ ...this.querySearch, query: '' });
    }
  }

  onFilterInstallments(event: MatButtonToggleChange) {
    const filter = event.value as TInstallmentFilter;
    let status: boolean = true;

    if (filter === 'pending') {
      status = !status;
    }
    // atualiza o filtro que dispara a pesquisa no banco de dados
    this.updateFilter({ ...this.querySearch, status });
    // atualiza o filtro para 'pending' ou 'finished'
    this.installmentStore.updateInstallmentFilter(filter);
  }

  onSearch(query: string) {
    this.querySearch = {
      query,
      status: false,
      page: this.pageIndex,
      size: this.pageSize,
    };

    if (this.installmentStore.filter() === 'pending') {
      this.installmentStore.updateFilter(this.querySearch);
    } else {
      this.installmentStore.updateFilter({
        ...this.querySearch,
        status: true,
      });
    }
  }

  private updateFilter(querySearch: TSearchQuery) {
    this.installmentStore.updateFilter(querySearch);
  }
}
