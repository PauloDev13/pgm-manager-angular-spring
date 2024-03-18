import { Component, EventEmitter, Output } from '@angular/core';

import { TSearchQuery } from '../../../shared/types/shared.type';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() query: EventEmitter<string> = new EventEmitter<string>();

  updateFilter(criteria: Partial<TSearchQuery>) {
    this.query.emit(criteria.query);
  }
}
