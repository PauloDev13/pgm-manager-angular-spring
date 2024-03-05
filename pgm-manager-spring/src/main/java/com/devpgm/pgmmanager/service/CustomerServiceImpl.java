package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.CustomerDTO;
import com.devpgm.pgmmanager.dto.customer.CustomerPageDTO;
import com.devpgm.pgmmanager.dto.customer.CustomerReqDTO;
import com.devpgm.pgmmanager.dto.customer.CustomerRespDTO;
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
  public List<CustomerRespDTO> customers() {
    return customerRepository.findAll()
        .stream()
        .map(customerMapper::toDTO)
        .toList();
  }

  @Override
  public CustomerPageDTO customersPagination(int page, int size) {
    Page<Customer> pageCustomers = customerRepository.findAll(PageRequest.of(page, size));
    List<CustomerRespDTO> customers = pageCustomers.get().map(customerMapper::toDTO).toList();
    return new CustomerPageDTO(
            customers,
            pageCustomers.getTotalElements(),
            pageCustomers.getTotalPages());
  }

  @Override
  public CustomerRespDTO findById(Long id) {
    return customerRepository.findById(id)
        .map(customerMapper::toDTO)
        .orElseThrow(() -> new RecordNotFoundException(id));
  }

  @Override
  public boolean isCPFExist(String document) {
    Optional<Customer> instFound = customerRepository.findByDocument(document);
    return instFound.isPresent();
  }

  @Transactional
  @Override
  public CustomerDTO create(CustomerReqDTO customerReqDTO) {
    if (customerReqDTO.installment() != null) {
      var newCustomer = new Customer();

      newCustomer.setName(customerReqDTO.name());
      newCustomer.setDocument(customerReqDTO.document());
      newCustomer.add(customerReqDTO.installment());

      return customerMapper.toCustomerDTO(customerRepository.save(newCustomer));

    } else {
      return customerMapper.toCustomerDTO(
          customerRepository.save(customerMapper.toEntity(customerReqDTO)));
    }
  }

  @Transactional
  @Override
  public CustomerRespDTO update(Long id, CustomerReqDTO customerReqDTO) {
    return customerRepository.findById(id)
        .map(customerFound -> {
          Customer customer = customerMapper.toEntity(customerReqDTO);
          customerFound.setName(customer.getName());
          customerFound.setDocument(customer.getDocument());

          return customerMapper.toDTO(customerRepository.save(customerFound));
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
