package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.CustomerReqDTO;
import com.devpgm.pgmmanager.dto.CustomerRespDTO;

import java.util.List;

public interface CustomerService {
    List<CustomerRespDTO> customers();
    CustomerRespDTO findById(Long id);
    CustomerRespDTO create(CustomerReqDTO customerReqDTO);
    CustomerRespDTO update(Long id, CustomerReqDTO customerReqDTO);
    void delete(Long id);
}
