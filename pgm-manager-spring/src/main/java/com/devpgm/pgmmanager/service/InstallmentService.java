package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.installment.*;

import java.util.List;

public interface InstallmentService {
  List<RespAllInstDTO> installments();
  InstallmentPageDTO  installmentsPagination(int page, int size);
  RespAllInstDTO findOneInstallment(Long id);
  RespCreatInstDTO create(ReqInstDTO reqInstDTO);
  String updateStatusAndDuration(Long id);
  List<String> listBadgesBySecretary(String secretary);
  RespInstStatusAndCustomerDTO instalmentByStatusCustomerId(Long id);
  boolean findByStatusBadgeSecretary(String badge, String secretary);
}
