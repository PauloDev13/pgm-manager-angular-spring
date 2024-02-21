package com.devpgm.pgmmanager.dto;

import java.util.Date;

public record InstallmentDTO(
    Long id,
    String badge,
    String secretary,
    boolean finished,
    int duration,
    Date createdAt,
    Date updatedAt

) {
}
