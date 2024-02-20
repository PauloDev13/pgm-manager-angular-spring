package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.InstallmentReqDTO;
import com.devpgm.pgmmanager.dto.InstallmentRespDTO;

import java.util.List;

public interface InstallmentService {
    List<InstallmentRespDTO> installments();
    InstallmentRespDTO create(InstallmentReqDTO installmentReqDTO);
}
