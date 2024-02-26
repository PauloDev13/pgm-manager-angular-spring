import { InstallmentModel } from '../model/installment.model';

export interface ReqCreateCustomerDTO {
  id?: number;
  name: string;
  document: string;
  installment?: InstallmentModel;
}
