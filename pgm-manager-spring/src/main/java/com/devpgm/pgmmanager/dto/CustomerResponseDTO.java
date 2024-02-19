package com.devpgm.pgmmanager.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.util.Date;
import java.util.List;

public record CustomerResponseDTO(
        Long id,
        @NotNull @NotBlank @Length(min = 5) String name,
        @NotNull @NotBlank @Length(max = 11) String document,
        @NotNull @NotBlank Date createdAt,
        @NotNull @NotBlank Date updatedAt,
        @NotNull @NotEmpty @Valid
        List<InstallmentRespDTO> installments
) {}
