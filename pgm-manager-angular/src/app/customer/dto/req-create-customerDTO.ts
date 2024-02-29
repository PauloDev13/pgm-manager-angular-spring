import { InstallmentModel } from '../../installment/model/installment.model';

export interface ReqCreateCustomerDTO {
  id?: number;
  name: string;
  document: string;
  installment?: InstallmentModel;
}
