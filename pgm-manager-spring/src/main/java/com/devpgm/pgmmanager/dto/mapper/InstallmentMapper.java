package com.devpgm.pgmmanager.dto.mapper;

import com.devpgm.pgmmanager.dto.InstallmentDefaultDTO;
import com.devpgm.pgmmanager.dto.installment.ReqInstallmentCreateDTO;
import com.devpgm.pgmmanager.model.Installment;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class InstallmentMapper {
  private final ModelMapper modelMapper;

  public InstallmentMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }

  public InstallmentDefaultDTO toModel(Installment installment) {
    return modelMapper.map(installment, InstallmentDefaultDTO.class);
  }

  public Installment toEntity(ReqInstallmentCreateDTO input) {
    return modelMapper.map(input, Installment.class);
  }
}
