import { Component, output } from '@angular/core';

import { TSearchQuery } from '../../../shared/types/shared.type';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  query = output<string>();

  updateFilter(criteria: Partial<TSearchQuery>) {
    this.query.emit(criteria.query!);
  }
}
