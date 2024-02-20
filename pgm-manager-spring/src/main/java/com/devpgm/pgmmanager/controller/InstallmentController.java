package com.devpgm.pgmmanager.controller;

import com.devpgm.pgmmanager.dto.InstallmentReqDTO;
import com.devpgm.pgmmanager.dto.InstallmentRespDTO;
import com.devpgm.pgmmanager.service.InstallmentService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public InstallmentRespDTO create(@RequestBody @NotNull @Valid InstallmentReqDTO installmentReqDTO) {
        return installmentService.create(installmentReqDTO);
    }
}
