package com.devpgm.pgmmanager.dto.customer;

import com.devpgm.pgmmanager.dto.installment.RespAllInstDTO;

import java.util.List;

public record CustomerPageDTO(
        List<CustomerRespDTO> customers,
        long totalElements,
        int totalPages
) {
}
