package com.devpgm.pgmmanager.dto.installment;

import com.devpgm.pgmmanager.dto.CustomerDTO;

public record RespCreatInstDTO(
    Long id,
    String badge,
    String secretary,
    CustomerDTO customer
) {
}
