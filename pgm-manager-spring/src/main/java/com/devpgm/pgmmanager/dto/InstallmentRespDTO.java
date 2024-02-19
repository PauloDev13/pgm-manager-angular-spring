package com.devpgm.pgmmanager.dto;

import com.devpgm.pgmmanager.model.Customer;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.util.Date;

public record InstallmentRespDTO(
        Long id,
        @NotNull @NotBlank @Length(max = 5) String badge,
        @NotNull @NotBlank @Length(min = 5, max = 100)
        String secretary,
        boolean finished,
        Date createdAt,
        Date updatedAt,
        @NotNull Customer customer
) {}
