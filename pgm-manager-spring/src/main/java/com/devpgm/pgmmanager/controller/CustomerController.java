package com.devpgm.pgmmanager.controller;

import com.devpgm.pgmmanager.dto.CustomerReqDTO;
import com.devpgm.pgmmanager.dto.CustomerRespDTO;
import com.devpgm.pgmmanager.service.CustomerService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
//@Validated
@RestController
@RequestMapping("api/customers")
public class CustomerController {
    private final CustomerService customerService;

    @GetMapping
    public List<CustomerRespDTO> customers() {
        return customerService.customers();
    }

    @GetMapping("/{id}")
    public CustomerRespDTO findById(@PathVariable @NotNull @Positive Long id) {
        return customerService.findById(id);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public CustomerRespDTO create(@RequestBody @NotNull @Valid CustomerReqDTO customerRequestDTO) {
        return customerService.create(customerRequestDTO);
    }

    @PutMapping("/{id}")
    public CustomerRespDTO update(@PathVariable @NotNull @Positive Long id,
                                  @RequestBody @NotNull @Valid CustomerReqDTO customerReqDTO){
        return customerService.update(id, customerReqDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        customerService.delete(id);
    }
}
