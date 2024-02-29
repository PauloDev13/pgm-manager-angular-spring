import { CustomerModel } from '../../customer/model/customer.model';

export interface ReqCreateInstallmentDTO {
  id?: number;
  secretary: string;
  badge: string;
  customer: CustomerModel;
}
