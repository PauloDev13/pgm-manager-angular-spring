package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.CustomerRequestDTO;
import com.devpgm.pgmmanager.dto.CustomerResponseDTO;
import com.devpgm.pgmmanager.dto.mapper.CustomerMapper;
import com.devpgm.pgmmanager.exception.RecordNotFoundException;
import com.devpgm.pgmmanager.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    @Override
    public List<CustomerResponseDTO> customers() {
        return customerRepository.findAll()
                .stream()
                .map(customerMapper::toDTO)
                .toList();
    }

    @Override
    public CustomerResponseDTO findById(Long id)  {
        return customerRepository.findById(id)
                .map(customerMapper::toDTO)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    @Override
    public CustomerResponseDTO create(CustomerRequestDTO customerRequestDTO) {
        return customerMapper.toDTO(customerRepository.save(customerMapper.toEntity(customerRequestDTO)));
    }
}
