package com.devpgm.pgmmanager.dto.installment;

import com.devpgm.pgmmanager.dto.CustomerDTO;

import java.util.Date;

public record RespCreatInstDTO(
    Long id,
    String badge,
    String secretary,
    Date createdAt,
    CustomerDTO customer
) {
}
