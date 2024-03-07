package com.devpgm.pgmmanager.dto.installment;

public record RespInstStatusAndCustomerDTO(
    Long id,
    String document,
    String customerName,
    boolean finished
) {
}
