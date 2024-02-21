package com.devpgm.pgmmanager.dto.customer;

import com.devpgm.pgmmanager.dto.InstallmentDTO;

import java.util.List;

public record CustomerRespDTO(
    Long id,
    String name,
    String document,
    List<InstallmentDTO> installments
) {
}
