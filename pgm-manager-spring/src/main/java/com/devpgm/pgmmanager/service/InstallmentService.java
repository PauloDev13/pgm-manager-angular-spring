package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.installment.*;

import java.util.List;

public interface InstallmentService {
  List<RespAllInstDTO> installments();
  InstallmentPageDTO  installmentsPagination(int page, int size);
  InstallmentPageDTO  installmentsSearchPagination(String query, Boolean status, int page, int size);
  RespAllInstDTO findOneInstallment(Long id);
  RespCreatInstDTO create(ReqInstDTO reqInstDTO);
  RespAllInstDTO updateStatusAndDuration(Long id);
  List<String> listBadgesBySecretary(String secretary);
  RespInstStatusAndCustomerDTO instalmentByStatusCustomerId(Long id);
  boolean findByStatusBadgeSecretary(String badge, String secretary);
}
