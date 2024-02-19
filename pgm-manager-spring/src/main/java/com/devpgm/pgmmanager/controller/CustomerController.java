package com.devpgm.pgmmanager.controller;

import com.devpgm.pgmmanager.dto.CustomerRequestDTO;
import com.devpgm.pgmmanager.dto.CustomerResponseDTO;
import com.devpgm.pgmmanager.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@Validated
@RestController
@RequestMapping("api/customers")
public class CustomerController {
    private final CustomerService customerService;

    @GetMapping
    public List<CustomerResponseDTO> customers() {
        return customerService.customers();
    }

    public CustomerResponseDTO create(@Validated @RequestBody CustomerRequestDTO customerRequestDTO) {
        return customerService.create(customerRequestDTO);
    }
}
