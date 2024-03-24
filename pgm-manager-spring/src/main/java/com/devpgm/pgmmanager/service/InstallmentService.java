package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.InstallmentDefaultDTO;
import com.devpgm.pgmmanager.dto.installment.PageInstallmentDTO;
import com.devpgm.pgmmanager.dto.installment.ReqInstallmentCreateDTO;
import com.devpgm.pgmmanager.dto.installment.RespInstStatusAndCustomerDTO;

import java.util.List;

public interface InstallmentService {
  List<InstallmentDefaultDTO> installments();
  PageInstallmentDTO installmentsPagination(int page, int size);
  PageInstallmentDTO installmentsSearchPagination(String query, Boolean status, int page, int size);
  InstallmentDefaultDTO findOneInstallment(Long id);
  InstallmentDefaultDTO create(ReqInstallmentCreateDTO input);
  InstallmentDefaultDTO updateStatusAndDuration(Long id);
  List<String> listBadgesBySecretary(String secretary);
  RespInstStatusAndCustomerDTO instalmentByStatusCustomerId(Long id);
  boolean findByStatusBadgeSecretary(String badge, String secretary);
}
