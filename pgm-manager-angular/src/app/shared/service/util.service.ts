import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { badges, secretaries } from '../../customer/data/secretaries';
import { InstallmentStore } from '../../installment/store/installment.store';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  // Variables
  public readonly listSecretaries = secretaries;
  public availableBadges: string[] = [];
  // Stores
  protected installmentStore = inject(InstallmentStore);
  protected readonly listBadges = badges;
  protected readonly baseUrlApi = 'http://localhost:8081/api/installments';
  protected readonly http = inject(HttpClient);

  getBadgesBySecretary(secretary: string) {
    return this.http.get<string[]>(`${this.baseUrlApi}/badges/${secretary}`);
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
