package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.installment.InstallmentReqDTO;
import com.devpgm.pgmmanager.dto.installment.InstallmentRespDTO;

import java.util.List;

public interface InstallmentService {
  List<InstallmentRespDTO> installments();
  InstallmentRespDTO create(InstallmentReqDTO installmentReqDTO);
}
