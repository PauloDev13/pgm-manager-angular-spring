package com.devpgm.pgmmanager.controller;

import com.devpgm.pgmmanager.dto.InstStatusAndCustomerIdDTO;
import com.devpgm.pgmmanager.dto.installment.InstallmentReqDTO;
import com.devpgm.pgmmanager.dto.installment.InstallmentRespDTO;
import com.devpgm.pgmmanager.service.InstallmentService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Validated
@RestController
@RequestMapping("api/installments")
public class InstallmentController {
  private final InstallmentService installmentService;

  @GetMapping
  public List<InstallmentRespDTO> installments() {
    return installmentService.installments();
  }

  @GetMapping("/badges/{secretary}")
  public List<String> badgesStatus(@PathVariable String secretary) {
    return installmentService.badgesBySecretary(secretary);
  }
  @GetMapping("/customer_id/{id}/installment")
  public InstStatusAndCustomerIdDTO getInstalmentsByCustomer(@PathVariable Long id) {
    return installmentService.instalmentByStatusCustomerId(id);
  }

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public InstallmentRespDTO create(@RequestBody @NotNull @Valid InstallmentReqDTO installmentReqDTO) {
    return installmentService.create(installmentReqDTO);
  }

  @PutMapping("/status/{id}")
  @ResponseStatus(code = HttpStatus.OK)
  public String updateStatus(@PathVariable @NotNull @Positive Long id) {
    return installmentService.updateStatus(id);
  }

}
