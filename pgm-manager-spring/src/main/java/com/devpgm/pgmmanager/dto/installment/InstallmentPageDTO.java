package com.devpgm.pgmmanager.dto.installment;

import java.util.List;

public record InstallmentPageDTO(
        List<RespAllInstDTO> installments,
        long totalElements,
        int totalPages
) {
}
