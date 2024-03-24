package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.customer.PageCustomerDTO;
import com.devpgm.pgmmanager.dto.customer.ReqCustomerDTO;
import com.devpgm.pgmmanager.dto.customer.RespCustomerDTO;

import java.util.List;

public interface CustomerService {
  List<RespCustomerDTO> customers();
  PageCustomerDTO customersPagination(int page, int size);
  PageCustomerDTO customersSearchPagination(String query, int page, int size);
  RespCustomerDTO findById(Long id);
  boolean isCPFExist(String document);
  RespCustomerDTO create(ReqCustomerDTO customerReqDTO);
  RespCustomerDTO update(Long id, ReqCustomerDTO customerReqDTO);
  void delete(Long id);
}
