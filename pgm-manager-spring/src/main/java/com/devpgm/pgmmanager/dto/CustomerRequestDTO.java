package com.devpgm.pgmmanager.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.util.List;

public record CustomerRequestDTO(
        Long id,
        @NotNull @NotBlank @Length(min = 5) String name,
        @NotNull @NotBlank @Length(max = 11) String document,
        @NotNull @NotEmpty @Valid
        List<InstallmentReqDTO> installments
) {}
