import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { InstallmentStore } from '../../installment/store/installment.store';
import { BADGES, SECRETARIES } from '../data/secretaries';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  // Variables
  public readonly listSecretaries = SECRETARIES;
  public availableBadges: string[] = [];
  protected readonly listBadges = BADGES;
  protected readonly baseUrlApi = 'http://localhost:8081/api';
  // Stores
  protected installmentStore = inject(InstallmentStore);
  protected readonly http = inject(HttpClient);

  getBadgesBySecretary(secretary: string) {
    return this.http.get<string[]>(
      `${this.baseUrlApi}/installments/badges/${secretary}`,
    );
  }
  getBadges(secretary: string) {
    const usedBadges: string[] = [];

    const installmentsFiltered = this.installmentStore
      .listInstallments()
      .filter(resp => resp.secretary === secretary && !resp.finished);

    installmentsFiltered.map(installment => {
      usedBadges.push(installment.badge);
    });

    this.availableBadges = this.listBadges.filter(
      badge => !usedBadges.includes(badge),
    );
  }
}
