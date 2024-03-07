import { InstallmentModel } from '../../installment/model/installment.model';

export interface CustomerListModel {
  id?: number;
  name: string;
  document: string;
  installments: InstallmentModel[];
}
