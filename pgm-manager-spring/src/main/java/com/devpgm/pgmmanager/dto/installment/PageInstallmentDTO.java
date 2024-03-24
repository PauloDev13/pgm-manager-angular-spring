package com.devpgm.pgmmanager.dto.installment;

import com.devpgm.pgmmanager.dto.InstallmentDefaultDTO;

import java.util.List;

public record PageInstallmentDTO(
        List<InstallmentDefaultDTO> installments,
        long totalElements,
        int totalPages
) {
}
