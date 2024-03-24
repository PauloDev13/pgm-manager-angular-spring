package com.devpgm.pgmmanager.controller;

import com.devpgm.pgmmanager.dto.InstallmentDefaultDTO;
import com.devpgm.pgmmanager.dto.installment.PageInstallmentDTO;
import com.devpgm.pgmmanager.dto.installment.ReqInstallmentCreateDTO;
import com.devpgm.pgmmanager.dto.installment.RespInstStatusAndCustomerDTO;
import com.devpgm.pgmmanager.service.InstallmentService;
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
@RestController
@RequestMapping("api/installments")
@CrossOrigin("*")
public class InstallmentController {
  private final InstallmentService installmentService;

  @GetMapping
  public List<InstallmentDefaultDTO> installments() {
    return installmentService.installments();
  }

  @GetMapping("/pagination")
  public PageInstallmentDTO installmentsPagination(
          @RequestParam(defaultValue = "0") @PositiveOrZero int page,
          @RequestParam(defaultValue = "10") @Positive @Max(100) int size)
  {
    return installmentService.installmentsPagination(page, size);
  }

  @GetMapping("/search")
  public PageInstallmentDTO installmentsSearchPagination(
          @RequestParam(defaultValue = "") String query,
          @RequestParam(defaultValue = "false") Boolean status,
          @RequestParam(defaultValue = "0") @PositiveOrZero int page,
          @RequestParam(defaultValue = "10") @Positive @Max(100) int size)
  {

    return installmentService.installmentsSearchPagination(query, status, page, size);
  }

  @GetMapping("/{id}")
  public InstallmentDefaultDTO getOneInstallment(@PathVariable @NotNull @Positive Long id) {
    return installmentService.findOneInstallment(id);
  }

  @GetMapping("/badges/{secretary}")
  public List<String> badgesBySecretary(@PathVariable @NotNull String secretary) {
    return installmentService.listBadgesBySecretary(secretary);
  }

  @GetMapping("/badge_exists")
  public boolean isBadgeExists(
      @PathParam("badge") @NotNull String badge,
      @PathParam("secretary") @NotNull String secretary)
  {
      return installmentService.findByStatusBadgeSecretary(badge, secretary);
  }

  @GetMapping("/customer_id/{id}/installment")
  public RespInstStatusAndCustomerDTO getInstalmentsByCustomer(@PathVariable @NotNull @Positive Long id) {
    return installmentService.instalmentByStatusCustomerId(id);
  }

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public InstallmentDefaultDTO create(@RequestBody @NotNull @Valid ReqInstallmentCreateDTO input) {
    return installmentService.create(input);
  }
  @PutMapping("/{id}/status")
  public InstallmentDefaultDTO updateStatusAndDuration(@PathVariable @NotNull @Positive Long id) {
    return installmentService.updateStatusAndDuration(id);
  }

}
