package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.customer.PageCustomerDTO;
import com.devpgm.pgmmanager.dto.customer.ReqCustomerDTO;
import com.devpgm.pgmmanager.dto.customer.RespCustomerDTO;
import com.devpgm.pgmmanager.dto.mapper.CustomerMapper;
import com.devpgm.pgmmanager.exception.RecordNotFoundException;
import com.devpgm.pgmmanager.model.Customer;
import com.devpgm.pgmmanager.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
  private final CustomerRepository customerRepository;
  private final CustomerMapper customerMapper;

  @Override
  public List<RespCustomerDTO> customers() {
    return customerRepository.findAll()
        .stream()
        .map(customerMapper::toModel)
        .toList();
  }

  @Override
  public PageCustomerDTO customersPagination(int page, int size) {
    Page<Customer> pageCustomers = customerRepository.findAll(PageRequest.of(page, size));
    List<RespCustomerDTO> customers = pageCustomers.get().map(customerMapper::toModel).toList();
    return new PageCustomerDTO(
            customers,
            pageCustomers.getTotalElements(),
            pageCustomers.getTotalPages());
  }

  @Override
  public PageCustomerDTO customersSearchPagination(String query, int page, int size) {
    Page<Customer> pageCustomers = customerRepository
        .searchPagination(query, PageRequest.of(page, size));

    List<RespCustomerDTO> customers = pageCustomers.get().map(customerMapper::toModel).toList();
    return new PageCustomerDTO(
            customers,
            pageCustomers.getTotalElements(),
            pageCustomers.getTotalPages()
    );
  }


  @Override
  public RespCustomerDTO findById(Long id) {
    return customerRepository.findById(id)
        .map(customerMapper::toModel)
        .orElseThrow(() -> new RecordNotFoundException(id));
  }

  @Override
  public boolean isCPFExist(String document) {
    Optional<Customer> instFound = customerRepository.findByDocument(document);
    return instFound.isPresent();
  }

  @Transactional
  @Override
  public RespCustomerDTO create(ReqCustomerDTO customerReqDTO) {
    if (customerReqDTO.getInstallment() != null) {
      var newCustomer = new Customer();

      newCustomer.setName(customerReqDTO.getName());
      newCustomer.setDocument(customerReqDTO.getDocument());
      newCustomer.add(customerReqDTO.getInstallment());

      return customerMapper.toModel(customerRepository.save(newCustomer));

    } else {
      return customerMapper.toModel(
          customerRepository.save(customerMapper.toEntity(customerReqDTO)));
    }
  }

  @Transactional
  @Override
  public RespCustomerDTO update(Long id, ReqCustomerDTO customerReqDTO) {
    return customerRepository.findById(id)
        .map(customerFound -> {
          Customer customer = customerMapper.toEntity(customerReqDTO);
          customerFound.setName(customer.getName());
          customerFound.setDocument(customer.getDocument());

          return customerMapper.toModel(customerRepository.save(customerFound));
        })
        .orElseThrow(() -> new RecordNotFoundException(id)
        );
  }

  @Transactional
  @Override
  public void delete(Long id) {
    customerRepository.delete(
        customerRepository.findById(id)
            .orElseThrow(() -> new RecordNotFoundException(id))
    );
  }

}
