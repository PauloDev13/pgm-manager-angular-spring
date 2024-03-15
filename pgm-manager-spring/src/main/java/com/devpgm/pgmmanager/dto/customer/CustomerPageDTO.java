package com.devpgm.pgmmanager.dto.customer;

import java.util.List;

public record CustomerPageDTO(
        List<CustomerRespDTO> customers,
        long totalElements,
        int totalPages
) {
}
