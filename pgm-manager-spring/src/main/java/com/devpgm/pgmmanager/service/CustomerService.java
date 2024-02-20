package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.CustomerReqDTO;
import com.devpgm.pgmmanager.dto.CustomerRespDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public interface CustomerService {
    List<CustomerRespDTO> customers();
    CustomerRespDTO findById(@NotNull @Positive Long id);
    CustomerRespDTO create(@Valid @NotNull CustomerReqDTO customerReqDTO);
    CustomerRespDTO update(@NotNull @Positive Long id, @Valid @NotNull CustomerReqDTO customerReqDTO);
    void delete(@NotNull @Positive Long id);
}
