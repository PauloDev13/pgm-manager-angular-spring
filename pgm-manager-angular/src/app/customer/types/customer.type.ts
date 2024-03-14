import { TPageAndSize, TSearchQuery } from '../../shared/types/shared.type';
import { ReqCreateCustomerDTO } from '../dto/req-create-customerDTO';
import { CustomerListModel } from '../model/customer-list.model';

export type TCustomerStoreState = {
  customer: ReqCreateCustomerDTO | null;
  listCustomers: CustomerListModel[];
  query: TPageAndSize;
  searchQuery: Partial<TSearchQuery>;
  totalElements: number;
  err: string | null;
};
