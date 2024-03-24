package com.devpgm.pgmmanager.dto.customer;

import com.devpgm.pgmmanager.model.Installment;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class RespCustomerDTO {
  Long id;
  String name;
  String document;
  List<Installment> installments;
}
