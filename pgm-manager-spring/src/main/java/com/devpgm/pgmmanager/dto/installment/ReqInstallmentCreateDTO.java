package com.devpgm.pgmmanager.dto.installment;

import com.devpgm.pgmmanager.model.Customer;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter @Setter
public class ReqInstallmentCreateDTO{
    Long id;
    @NotNull(message = "Nº do crachá é obrigatório")
    @NotBlank(message = "Nº do crachá não pode ser vazio")
    @Length(max = 5, message = "Nº do crachá de ter no máximo, 5 caracteres")
    String badge;
    @NotNull(message = "Secretaria é obrigatório")
    @NotBlank(message = "Secretaria não pode ser vazio")
    @Length(min = 2, max = 50, message = "Secretaria deve ter entre 2 e 50 caracteres")
    String secretary;
    @NotNull(message = "O ID do cliente é obrigatório")
    Customer customer;
}
