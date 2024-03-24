package com.devpgm.pgmmanager.dto.customer;

import com.devpgm.pgmmanager.model.Installment;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter @Setter
public class ReqCustomerDTO {
  @NotBlank(message = "Nome não pode ser vazio")
  @NotNull(message = "Nome é obrigatório")
  @Length(min = 5, message = "Nome deve ter no mínimo, 5 caracteres")
  String name;
  @NotNull(message = "CPF é obrigatório")
  @NotBlank(message = "CPF não pode ser vazio")
  @Length(min = 11, max = 11, message = "CPF deve ter 11 caracteres somente números")
  String document;
  Installment installment;
}
