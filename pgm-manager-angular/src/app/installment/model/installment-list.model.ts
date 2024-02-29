import { CustomerModel } from '../../customer/model/customer.model';

export interface InstallmentListModel {
  id: number;
  secretary: string;
  badge: string;
  finished: boolean;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  customer: CustomerModel;
}
