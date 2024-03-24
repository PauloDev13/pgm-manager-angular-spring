package com.devpgm.pgmmanager.dto.customer;

import java.util.List;

public record PageCustomerDTO(
        List<RespCustomerDTO> customers,
        long totalElements,
        int totalPages
) {
}
