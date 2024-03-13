package com.devpgm.pgmmanager.controller;

import com.devpgm.pgmmanager.dto.CustomerDTO;
import com.devpgm.pgmmanager.dto.customer.CustomerPageDTO;
import com.devpgm.pgmmanager.dto.customer.CustomerReqDTO;
import com.devpgm.pgmmanager.dto.customer.CustomerRespDTO;
import com.devpgm.pgmmanager.service.CustomerService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Validated
@CrossOrigin("*")
@RestController
@RequestMapping("api/customers")
public class CustomerController {
  private final CustomerService customerService;

  @GetMapping
  public List<CustomerRespDTO> customers() {
    return customerService.customers();
  }
  @GetMapping("/pagination")
  public CustomerPageDTO customersPagination(
          @RequestParam(defaultValue = "0") @PositiveOrZero int page,
          @RequestParam(defaultValue = "10") @Positive @Max(100) int size
  ) {
    return customerService.customersPagination(page, size);
  }

  @GetMapping("/search")
  public CustomerPageDTO customersSearchPagination(
          @RequestParam( defaultValue = "") String search,
          @RequestParam(defaultValue = "0")@PositiveOrZero int page,
          @RequestParam(defaultValue = "10") @Positive @Max(100) int size
  ) {
    return customerService.customersSearchPagination(search, page, size);
  }

  @GetMapping("/cpf_exists")
  public boolean isCPFExist(@PathParam("document") @NotNull String document) {
    return customerService.isCPFExist(document);
  }

  @GetMapping("/{id}")
  public CustomerRespDTO findById(@PathVariable @NotNull @Positive Long id) {
    return customerService.findById(id);
  }

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public CustomerDTO create(@RequestBody @NotNull @Valid CustomerReqDTO customerRequestDTO) {
    return customerService.create(customerRequestDTO);
  }

  @PutMapping("/{id}")
  public CustomerRespDTO update(@PathVariable @NotNull @Positive Long id,
                                @RequestBody @NotNull @Valid CustomerReqDTO customerReqDTO) {
    return customerService.update(id, customerReqDTO);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(code = HttpStatus.NO_CONTENT)
  public void delete(@PathVariable @NotNull @Positive Long id) {
    customerService.delete(id);
  }
}
