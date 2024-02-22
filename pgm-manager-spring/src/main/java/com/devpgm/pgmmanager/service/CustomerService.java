package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.CustomerDTO;
import com.devpgm.pgmmanager.dto.customer.CustomerReqDTO;
import com.devpgm.pgmmanager.dto.customer.CustomerRespDTO;

import java.util.List;

public interface CustomerService {
  List<CustomerRespDTO> customers();
  boolean isCPFExist(String document);
  CustomerRespDTO findById(Long id);
  CustomerDTO create(CustomerReqDTO customerReqDTO);
  CustomerRespDTO update(Long id, CustomerReqDTO customerReqDTO);
  void delete(Long id);
}
