package com.devpgm.pgmmanager.dto.mapper;

import com.devpgm.pgmmanager.dto.customer.ReqCustomerDTO;
import com.devpgm.pgmmanager.dto.customer.RespCustomerDTO;
import com.devpgm.pgmmanager.model.Customer;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

  private final ModelMapper modelMapper;

  public CustomerMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }
  // retorna um DTO a partir da entidade Customer
  public RespCustomerDTO toModel(Customer customer) {
    return modelMapper.map(customer, RespCustomerDTO.class);
  }
  // retorna uma entidade customer a partir do DTO
  public Customer toEntity(ReqCustomerDTO requestDTO) {
    return modelMapper.map(requestDTO, Customer.class);
  }
}
