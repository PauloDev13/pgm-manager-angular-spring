package com.devpgm.pgmmanager.dto;

public record InstStatusAndCustomerIdDTO(
    String badge,
    String secretary,
    boolean finished,
    String customerName
) {
}
