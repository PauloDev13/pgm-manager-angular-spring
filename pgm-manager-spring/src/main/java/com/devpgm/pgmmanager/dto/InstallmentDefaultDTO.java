package com.devpgm.pgmmanager.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class InstallmentDefaultDTO {
  Long id;
  String badge;
  String secretary;
  boolean finished;
  int duration;
  Date createdAt;
  Date updatedAt;
  CustomerDefaultDTO customer;
}
