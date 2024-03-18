import { TSearchQuery } from '../../shared/types/shared.type';
import { ReqCreateInstallmentDTO } from '../dto/req-create-installmentDTO';
import { InstallmentListModel } from '../model/installment-list.model';

export type TInstallmentState = {
  installment: ReqCreateInstallmentDTO;
  listInstallments: InstallmentListModel[];
  filter: TInstallmentFilter;
  searchQuery: Partial<TSearchQuery>;
  loaded: boolean;
  totalElements: number;
  err: string | null;
};

export type TNewInstallment = {
  secretary: string;
  badge: string;
  customer: {
    id: number;
  };
};

export type TInstallmentFilter = 'finished' | 'pending';
