package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.installment.RespCreatInstDTO;
import com.devpgm.pgmmanager.dto.installment.RespInstStatusAndCustomerDTO;
import com.devpgm.pgmmanager.dto.installment.ReqInstDTO;
import com.devpgm.pgmmanager.dto.installment.RespAllInstDTO;
import com.devpgm.pgmmanager.dto.mapper.InstallmentMapper;
import com.devpgm.pgmmanager.exception.RecordNotFoundException;
import com.devpgm.pgmmanager.model.Installment;
import com.devpgm.pgmmanager.repository.CustomerRepository;
import com.devpgm.pgmmanager.repository.InstallmentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class InstallmentServiceImpl implements InstallmentService {
  private final InstallmentRepository installmentRepository;
  private final CustomerRepository customerRepository;
  private final InstallmentMapper installmentMapper;

  @Override
  public RespAllInstDTO findOneInstallment(Long id) {
    return installmentMapper.toRespAllInstDTO(installmentRepository.findById(id)
        .orElseThrow(() -> new RecordNotFoundException(id)));
  }

  @Override
  public List<RespAllInstDTO> installments() {
    return installmentRepository.findAll()
        .stream()
        .map(installmentMapper::toRespAllInstDTO)
        .toList();
  }

  @Transactional
  @Override
  public RespCreatInstDTO create(ReqInstDTO reqInstDTO) {
    return customerRepository.findById(reqInstDTO.customer().getId())
        .map(customer -> {
          reqInstDTO.customer().setName(customer.getName());
          reqInstDTO.customer().setDocument(customer.getDocument());
          return installmentMapper.toRespCreateInstDTO(
              installmentRepository.save(installmentMapper.toEntity(reqInstDTO)));
        })
        .orElseThrow(() -> new RecordNotFoundException(reqInstDTO.customer().getId()));
  }

  @Override
  public String updateStatusAndDuration(Long id) {
    return installmentRepository.findById(id)
        .map(installmentFound -> {
          installmentFound.setFinished(true);
          installmentFound.setDuration((int) calculateDuration(installmentFound.getCreatedAt()));
          installmentRepository.save(installmentFound);

          return "Status true";
        })
        .orElseThrow(() -> new RecordNotFoundException(id));
  }

  @Override
  public List<String> listBadgesBySecretary(String secretary) {
    List<Installment> list = installmentRepository.findBySecretaryAndFinishedIsFalse(secretary.toUpperCase());

    if (list.isEmpty()) {
      throw new RecordNotFoundException();
    }

    return list.stream()
        .map(Installment::getBadge).toList();
  }

  @Override
  public RespInstStatusAndCustomerDTO instalmentByStatusCustomerId(Long id) {
    return installmentRepository.findFirstByCustomerIdAndFinishedIsFalse(id)
        .map(respDTO ->
            new RespInstStatusAndCustomerDTO(
                respDTO.getBadge(),
                respDTO.getSecretary(),
                respDTO.isFinished(),
                respDTO.getCustomer().getName()
            )
        ).orElseThrow(() -> new RecordNotFoundException(id));
  }

  @Override
  public boolean findByStatusBadgeSecretary(String badge, String secretary) {
    Optional<Installment> inst =
        installmentRepository.findByBadgeAndSecretaryAndFinishedIsFalse(badge, secretary.toUpperCase());
    return inst.isPresent();
  }

  private double calculateDuration(Date endDate) {
    Date startDate = new Date();
    var dateDiff = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil((double) dateDiff / 60000);
  }


}
