package com.devpgm.pgmmanager.dto;

import java.util.Date;
import java.util.List;

public record CustomerRespDTO(
        Long id,
        String name,
        String document,
        Date createdAt,
        Date updatedAt,
        List<InstallmentRespDTO> installments
) {}
