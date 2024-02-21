package com.devpgm.pgmmanager.dto.installment;

import com.devpgm.pgmmanager.dto.CustomerDTO;
import java.util.Date;

public record InstallmentRespDTO(
    Long id,
    String badge,
    String secretary,
    boolean finished,
    int duration,
    Date createdAt,
    Date updatedAt,
    CustomerDTO customer
) {
}
