package com.devpgm.pgmmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;


public record CustomerReqDTO(
        Long id,
        @NotBlank(message = "Nome não pode ser vazio")
        @NotNull(message = "Nome é obrigatório")
        @Length(min = 5, message = "Nome deve ter no mínimo, 5 caracteres")
        String name,
        @NotNull(message = "DPF é obrigatório")
        @NotBlank(message = "CPF não pode ser vazio")
        @Length(min = 11, max = 11, message = "CPF deve ter 11 caracteres somente números")
        String document
) {}
