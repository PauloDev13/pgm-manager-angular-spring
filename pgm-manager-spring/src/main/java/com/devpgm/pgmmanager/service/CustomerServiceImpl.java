package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.CustomerReqDTO;
import com.devpgm.pgmmanager.dto.CustomerRespDTO;
import com.devpgm.pgmmanager.dto.mapper.CustomerMapper;
import com.devpgm.pgmmanager.exception.RecordNotFoundException;
import com.devpgm.pgmmanager.model.Customer;
import com.devpgm.pgmmanager.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

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
    public CustomerRespDTO findById(Long id) {
        return customerRepository.findById(id)
                .map(customerMapper::toDTO)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    @Override
    public CustomerRespDTO create(CustomerReqDTO customerReqDTO) {
        return customerMapper.toDTO(
                customerRepository.save(customerMapper.toEntity(customerReqDTO)));
    }

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

    @Override
    public void delete(Long id) {
        customerRepository.delete(
                customerRepository.findById(id)
                        .orElseThrow(() -> new RecordNotFoundException(id))
        );
    }

}
