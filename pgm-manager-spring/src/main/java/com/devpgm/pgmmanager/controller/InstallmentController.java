package com.devpgm.pgmmanager.controller;

import com.devpgm.pgmmanager.dto.installment.RespCreatInstDTO;
import com.devpgm.pgmmanager.dto.installment.RespInstStatusAndCustomerDTO;
import com.devpgm.pgmmanager.dto.installment.ReqInstDTO;
import com.devpgm.pgmmanager.dto.installment.RespAllInstDTO;
import com.devpgm.pgmmanager.service.InstallmentService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.websocket.server.PathParam;
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
  public List<RespAllInstDTO> installments() {
    return installmentService.installments();
  }

  @GetMapping("/{id}")
  public RespAllInstDTO getOneInstallment(@PathVariable @NotNull @Positive Long id) {
    return installmentService.findOneInstallment(id);
  }

  @GetMapping("/badges/{secretary}")
  public List<String> badgesStatus(@PathVariable @NotNull String secretary) {
    return installmentService.listBadgesBySecretary(secretary);
  }

  @GetMapping("/badge_exists")
  public boolean isBadgeExists(
      @PathParam("badge") String badge,
      @PathParam("secretary") String secretary)
  {
      return installmentService.findByStatusBadgeSecretary(badge, secretary);
  }

  @GetMapping("/customer_id/{id}/installment")
  public RespInstStatusAndCustomerDTO getInstalmentsByCustomer(@PathVariable @NotNull @Positive Long id) {
    return installmentService.instalmentByStatusCustomerId(id);
  }

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public RespCreatInstDTO create(@RequestBody @NotNull @Valid ReqInstDTO reqInstDTO) {
    return installmentService.create(reqInstDTO);
  }

  @PutMapping("/status/{id}")
  @ResponseStatus(code = HttpStatus.OK)
  public String updateStatusAndDuration(@PathVariable @NotNull @Positive Long id) {
    return installmentService.updateStatusAndDuration(id);
  }

}
