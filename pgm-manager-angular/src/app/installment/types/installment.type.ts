import { TPageAndSize } from '../../shared/types/shared.type';
import { ReqCreateInstallmentDTO } from '../dto/req-create-installmentDTO';
import { InstallmentListModel } from '../model/installment-list.model';

export type TInstallmentState = {
  installment: ReqCreateInstallmentDTO;
  listInstallments: InstallmentListModel[];
  query: TPageAndSize;
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
