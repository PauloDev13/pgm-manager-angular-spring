import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { installmentStore } from '../../store/installment.store';

@Component({
  selector: 'app-installment-list',
  standalone: true,
  imports: [
    DatePipe,
    // MatTableModule,
    // MatColumnDef,
    // MatHeaderCellDef,
    // MatHeaderCell,
    // TitleCasePipe,
    // MatCellDef,
    // MatCell,
    // MatHeaderRowDef,
    // MatHeaderRow,
    // MatRow,
    // MatPaginator,
  ],
  templateUrl: './installment-list.component.html',
  styleUrl: './installment-list.component.scss',
})
export default class InstallmentListComponent {
  protected readonly store = inject(installmentStore);
  list = this.store.loadAll();
  protected displayedColumns = [
    'name',
    'document',
    'secretary',
    'badge',
    'createdAt',
    'updatedAt',
    'duration',
    'options',
  ];
}
