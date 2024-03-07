export interface RespCreateCustomerDTO {
  id: number;
  name: string;
  document: string;
  installment: {
    id: number;
    secretary: string;
    badge: string;
  };
}
