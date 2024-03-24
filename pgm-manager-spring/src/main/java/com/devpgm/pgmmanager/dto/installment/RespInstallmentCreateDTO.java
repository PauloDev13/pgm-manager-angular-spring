package com.devpgm.pgmmanager.dto.installment;

import com.devpgm.pgmmanager.dto.CustomerDefaultDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter @Setter
public class RespInstallmentCreateDTO {
    Long id;
    String badge;
    String secretary;
    Date createdAt;
    CustomerDefaultDTO customer;
  
}
