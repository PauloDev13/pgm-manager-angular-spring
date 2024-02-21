package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.installment.InstallmentReqDTO;
import com.devpgm.pgmmanager.dto.installment.InstallmentRespDTO;
import com.devpgm.pgmmanager.dto.mapper.InstallmentMapper;
import com.devpgm.pgmmanager.exception.RecordNotFoundException;
import com.devpgm.pgmmanager.repository.CustomerRepository;
import com.devpgm.pgmmanager.repository.InstallmentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstallmentServiceImpl implements InstallmentService {
  private final InstallmentRepository installmentRepository;
  private final CustomerRepository customerRepository;
  private final InstallmentMapper installmentMapper;

  @Override
  public List<InstallmentRespDTO> installments() {
    return installmentRepository.findAll()
        .stream()
        .map(installmentMapper::toDTO)
        .toList();
  }

  @Transactional
  @Override
  public InstallmentRespDTO create(InstallmentReqDTO installmentReqDTO) {
    return customerRepository.findById(installmentReqDTO.customer().getId())
        .map(customer -> {
          installmentReqDTO.customer().setName(customer.getName());
          installmentReqDTO.customer().setDocument(customer.getDocument());
          return installmentMapper.toDTO(installmentRepository.save(installmentMapper.toEntity(installmentReqDTO)));
        })
        .orElseThrow(() -> new RecordNotFoundException(installmentReqDTO.customer().getId()));
  }

}
