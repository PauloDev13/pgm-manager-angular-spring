import {InstallmentListModel} from "../model/installment-list.model";

export interface RespInstallmentPageDTO {
  installments: InstallmentListModel[],
  totalElements: number,
  totalPages: number,

}
