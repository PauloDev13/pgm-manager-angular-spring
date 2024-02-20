package com.devpgm.pgmmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;


public record CustomerReqDTO(
        Long id,
        @NotNull @NotBlank @Length(min = 5) String name,
        @NotNull @NotBlank @Length(max = 11) String document
) {}
