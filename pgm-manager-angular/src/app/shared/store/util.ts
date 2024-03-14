import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';

import { BADGES } from '../data/secretaries';
import { UtilService } from '../service/util.service';
import { TUtilState } from '../types/shared.type';

const TInitialUtilStoreState: TUtilState = {
  originalBadges: BADGES,
  availableBadges: BADGES,
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
