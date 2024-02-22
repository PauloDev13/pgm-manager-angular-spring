package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.InstStatusAndCustomerIdDTO;
import com.devpgm.pgmmanager.dto.installment.InstallmentReqDTO;
import com.devpgm.pgmmanager.dto.installment.InstallmentRespDTO;

import java.util.List;

public interface InstallmentService {
  List<InstallmentRespDTO> installments();
  InstallmentRespDTO create(InstallmentReqDTO installmentReqDTO);
  String updateStatus(Long id);
  List<String> badgesBySecretary(String secretary);
  InstStatusAndCustomerIdDTO instalmentByStatusCustomerId(Long id);

}
