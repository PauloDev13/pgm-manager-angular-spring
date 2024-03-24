package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.InstallmentDefaultDTO;
import com.devpgm.pgmmanager.dto.installment.PageInstallmentDTO;
import com.devpgm.pgmmanager.dto.installment.ReqInstallmentCreateDTO;
import com.devpgm.pgmmanager.dto.installment.RespInstStatusAndCustomerDTO;
import com.devpgm.pgmmanager.dto.mapper.InstallmentMapper;
import com.devpgm.pgmmanager.exception.RecordNotFoundException;
import com.devpgm.pgmmanager.model.Installment;
import com.devpgm.pgmmanager.repository.CustomerRepository;
import com.devpgm.pgmmanager.repository.InstallmentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class InstallmentServiceImpl implements InstallmentService {
  private final InstallmentRepository installmentRepository;
  private final CustomerRepository customerRepository;
  private final InstallmentMapper installmentMapper;

  @Override
  public InstallmentDefaultDTO findOneInstallment(Long id) {
    return installmentMapper.toModel(installmentRepository.findById(id)
        .orElseThrow(() -> new RecordNotFoundException(id)));
  }

  @Override
  public List<InstallmentDefaultDTO> installments() {
    return installmentRepository.findAll()
        .stream()
        .map(installmentMapper::toModel)
        .toList();
  }

  @Override
  public PageInstallmentDTO installmentsPagination(int page, int size) {
    Page<Installment> pageInstallments =
        installmentRepository.findAll(PageRequest.of(
            page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
    List<InstallmentDefaultDTO> installments =
        pageInstallments.get().map(installmentMapper::toModel).toList();
    return new PageInstallmentDTO(
        installments,
        pageInstallments.getTotalElements(),
        pageInstallments.getTotalPages());
  }

  @Override
  public PageInstallmentDTO installmentsSearchPagination(String query, Boolean status, int page, int size) {
    Page<Installment> pageInstallments = installmentRepository.searchPagination(
        query, status, PageRequest.of(page, size));
    List<InstallmentDefaultDTO> installments =
        pageInstallments.get().map(installmentMapper::toModel).toList();

    log.info("Search installment by Customer params QUERY: {}, STATUS: {}, PAGE {}, SIZE {}",
        query, status, page, size);

    return new PageInstallmentDTO(
        installments,
        pageInstallments.getTotalElements(),
        pageInstallments.getTotalPages());
  }

  @Transactional
  @Override
  public InstallmentDefaultDTO create(ReqInstallmentCreateDTO input) {
    return customerRepository.findById(input.getCustomer().getId())
        .map(customer -> {
          input.getCustomer().setName(customer.getName());
          input.getCustomer().setDocument(customer.getDocument());
          return installmentMapper.toModel(
              installmentRepository.save(installmentMapper.toEntity(input)));
        })
        .orElseThrow(() -> new RecordNotFoundException(input.getCustomer().getId()));
  }

  @Override
  public InstallmentDefaultDTO updateStatusAndDuration(Long id) {
    return installmentRepository.findById(id)
        .map(installmentFound -> {
          installmentFound.setFinished(true);
          installmentFound.setDuration((int) calculateDuration(installmentFound.getCreatedAt()));
          return installmentMapper.toModel(installmentRepository.save(installmentFound));
        })
        .orElseThrow(() -> new RecordNotFoundException(id));
  }

  @Override
  public List<String> listBadgesBySecretary(String secretary) {
    List<Installment> list = installmentRepository.findBySecretaryAndFinishedIsFalse(secretary.toLowerCase());

    return list.stream()
        .map(Installment::getBadge).toList();
  }

  @Override
  public RespInstStatusAndCustomerDTO instalmentByStatusCustomerId(Long id) {
    return installmentRepository.findFirstByCustomerId(id)
        .map(respDTO ->
            new RespInstStatusAndCustomerDTO(
                respDTO.getId(),
                respDTO.getCustomer().getDocument(),
                respDTO.getCustomer().getName(),
                respDTO.isFinished()
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
