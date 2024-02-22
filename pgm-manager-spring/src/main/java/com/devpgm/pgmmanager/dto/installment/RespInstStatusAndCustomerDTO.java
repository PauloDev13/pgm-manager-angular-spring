package com.devpgm.pgmmanager.dto.installment;

public record RespInstStatusAndCustomerDTO(
    String badge,
    String secretary,
    boolean finished,
    String customerName
) {
}
