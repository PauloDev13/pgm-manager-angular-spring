package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.CustomerRequestDTO;
import com.devpgm.pgmmanager.dto.CustomerResponseDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public interface CustomerService {
    List<CustomerResponseDTO> customers();
    CustomerResponseDTO findById(@NotNull @Positive Long id);
    CustomerResponseDTO create(@Valid @NotNull CustomerRequestDTO customerRequestDTO);
}
