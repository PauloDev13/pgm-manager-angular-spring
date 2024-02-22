package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.installment.RespCreatInstDTO;
import com.devpgm.pgmmanager.dto.installment.RespInstStatusAndCustomerDTO;
import com.devpgm.pgmmanager.dto.installment.ReqInstDTO;
import com.devpgm.pgmmanager.dto.installment.RespAllInstDTO;

import java.util.List;

public interface InstallmentService {
  List<RespAllInstDTO> installments();
  RespAllInstDTO findOneInstallment(Long id);
  RespCreatInstDTO create(ReqInstDTO reqInstDTO);
  String updateStatusAndDuration(Long id);
  List<String> listBadgesBySecretary(String secretary);
  RespInstStatusAndCustomerDTO instalmentByStatusCustomerId(Long id);
  boolean findByStatusBadgeSecretary(String badge, String secretary);
}
