import { DatePipe } from '@angular/common';
import { Component, effect, inject, viewChild } from '@angular/core';
import {
  MatButtonToggle,
  MatButtonToggleChange,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { take } from 'rxjs';

import { SearchComponent } from '../../../core/components/search/search.component';
import { LoaderSpinnerComponent } from '../../../shared/components/loader-spinner/loader-spinner.component';
import { NotifierService } from '../../../shared/service/notifier.service';
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
  private notifierService = inject(NotifierService);
  private filter = viewChild.required(MatButtonToggleGroup);
  private querySearch!: Partial<TSearchQuery>;

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
    // chama o Snackbar de confirmação passando os parâmetros.
    this.notifierService
      .showConfirmation({
        displayMsg: `FINALIZAR O ATENDIMENTO DE ${installment.customer.name.toUpperCase()}?`,
        cssType: 'finish-snackbar',
      })
      .afterDismissed()
      .pipe(take(1))
      .subscribe({
        next: action => {
          if (action.dismissedByAction) {
            this.installmentStore.updateStatus({ id: installment.id });
            this.installmentStore.updateFilter(this.querySearch);
          }
        },
      });
  }

  onFilterInstallments(event: MatButtonToggleChange) {
    const filter = event.value as TInstallmentFilter;
    let status: boolean = true;

    if (filter === 'pending') {
      status = !status;
    }
    this.querySearch = {
      query: '',
      page: this.pageIndex,
      size: this.pageSize,
      status,
    };
    // atualiza o filtro que dispara a pesquisa no banco de dados
    this.updateFilter(this.querySearch);
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

  private updateFilter(querySearch: Partial<TSearchQuery>) {
    this.installmentStore.updateFilter(querySearch);
  }
}
