import {Component, effect, inject} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {CustomerStore} from "../../store/custumer.store";

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    DatePipe,
    MatPaginator
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  protected readonly store = inject(CustomerStore);
  protected totalElements: number = this.store.totalElements();
  protected pageIndex: number = 0;
  protected pageSize: number = 10;

  constructor() {
    effect(() => {
      this.store.loadAllPagination({
        page: this.pageIndex,
        size: this.pageSize,
      });
    });
  }

  refresh(
    pageEvent: PageEvent = {
      length: this.totalElements,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    },
  ) {
    this.store.loadAllPagination({
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize,
    });
    this.totalElements = this.store.totalElements();
  }

  teste(event: any) {
    console.log('PASSOU ', event)
  }
}
