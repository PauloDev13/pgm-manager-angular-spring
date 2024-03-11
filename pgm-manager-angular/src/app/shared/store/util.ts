import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';

import { badges } from '../../customer/data/secretaries';
import { UtilService } from '../service/util.service';

type TUtilState = {
  originalBadges: string[];
  availableBadges: string[];
  err: string | null;
};

const TInitialUtilStoreState: TUtilState = {
  originalBadges: badges,
  availableBadges: badges,
  err: null,
};

export const UtilStore = signalStore(
  { providedIn: 'root' },
  withState(TInitialUtilStoreState),
  withMethods((store, utilService = inject(UtilService)) => ({
    loadBages: rxMethod<string>(
      pipe(
        switchMap(secretary => utilService.getBadgesBySecretary(secretary)),
        tapResponse({
          next: usedBages => {
            const availableBadges = store
              .originalBadges()
              .filter(value => !usedBages.includes(value));

            patchState(store, {
              availableBadges,
              err: null,
            });
          },
          error: (err: HttpErrorResponse) =>
            patchState(store, {
              err: `Error ao buscar crachás. CODE: ${err.status}`,
            }),
        }),
      ),
    ),
  })),
);
