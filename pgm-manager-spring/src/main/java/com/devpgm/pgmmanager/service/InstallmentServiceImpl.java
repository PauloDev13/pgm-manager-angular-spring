package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.InstStatusAndCustomerIdDTO;
import com.devpgm.pgmmanager.dto.installment.InstallmentReqDTO;
import com.devpgm.pgmmanager.dto.installment.InstallmentRespDTO;
import com.devpgm.pgmmanager.dto.mapper.InstallmentMapper;
import com.devpgm.pgmmanager.exception.RecordNotFoundException;
import com.devpgm.pgmmanager.model.Installment;
import com.devpgm.pgmmanager.repository.CustomerRepository;
import com.devpgm.pgmmanager.repository.InstallmentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
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

  @Override
  public String updateStatus(Long id) {
        return installmentRepository.findById(id)
        .map(installmentFound -> {
          installmentFound.setFinished(true);
          installmentFound.setDuration((int)calculateDuration(installmentFound.getCreatedAt()));
          installmentRepository.save(installmentFound);

          return "Status true";
        })
        .orElseThrow(() -> new RecordNotFoundException(id));
  }

  @Override
  public List<String> badgesBySecretary(String secretary) {
    List<Installment> list = installmentRepository.findBySecretaryAndFinishedIsFalse(secretary.toUpperCase());

    if (list.isEmpty()) {
      throw new RecordNotFoundException();
    }

    return list.stream()
        .map(Installment::getBadge).toList();
  }

  @Override
  public InstStatusAndCustomerIdDTO instalmentByStatusCustomerId(Long id) {
    return  installmentRepository.findFirstByCustomerIdAndFinishedIsFalse(id)
        .map(respDTO ->
          new InstStatusAndCustomerIdDTO(
              respDTO.getBadge(),
              respDTO.getSecretary(),
              respDTO.isFinished(),
              respDTO.getCustomer().getName()
          )
        ).orElseThrow(() -> new RecordNotFoundException(id));
  }

  private double calculateDuration(Date endDate) {
    Date startDate = new Date();
    var dateDiff = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil((double) dateDiff / 60000);
  }


}
