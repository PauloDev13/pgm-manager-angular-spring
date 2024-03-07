import { CustomerListModel } from '../model/customer-list.model';

export interface RespCustomerPageDTO {
  customers: CustomerListModel[];
  totalElements: number;
  totalPages: number;
}
