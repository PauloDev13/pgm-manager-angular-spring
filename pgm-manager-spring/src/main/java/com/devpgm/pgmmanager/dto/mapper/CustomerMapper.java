package com.devpgm.pgmmanager.dto.mapper;

import com.devpgm.pgmmanager.dto.CustomerDTO;
import com.devpgm.pgmmanager.dto.customer.CustomerReqDTO;
import com.devpgm.pgmmanager.dto.customer.CustomerRespDTO;
import com.devpgm.pgmmanager.model.Customer;
import com.devpgm.pgmmanager.model.Installment;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomerMapper {

  // retorna um DTO sem a lista de Installments
  public CustomerDTO toCustomerDTO(Customer customer) {
    if (customer == null) {
      return null;
    }

    return new CustomerDTO(
        customer.getId(),
        customer.getName(),
        customer.getDocument()
    );
  }

  // retorna um DTO com a lista de Installments
  public CustomerRespDTO toDTO(Customer customer) {
    if (customer == null) {
      return null;
    }

    return new CustomerRespDTO(
        customer.getId(),
        customer.getName(),
        customer.getDocument(),
        customer.listInstallmentDTO()
    );
  }

  public Customer toEntity(CustomerRespDTO customerResponseDTO) {
    if (customerResponseDTO == null) {
      return null;
    }

    Customer customer = new Customer();

    if (customerResponseDTO.id() != null) {
      customer.setId(customerResponseDTO.id());
    }

    customer.setName(customerResponseDTO.name());
    customer.setDocument(customerResponseDTO.document());

    List<Installment> installmentList = customerResponseDTO.installments()
        .stream()
        .map(installmentRespDTO -> {
          var installment = new Installment();

          installment.setId(installmentRespDTO.id());
          installment.setBadge(installmentRespDTO.badge());
          installment.setFinished(installmentRespDTO.finished());
          installment.setCreatedAt(installmentRespDTO.createdAt());
          installment.setUpdatedAt(installmentRespDTO.updatedAt());
          installment.setCustomer(customer);
          return installment;
        }).toList();

    customer.setInstallments(installmentList);

    return customer;
  }

  public Customer toEntity(CustomerReqDTO requestDTO) {
    if (requestDTO.id() != null) {
      Customer customer = new Customer();
      customer.setId(requestDTO.id());
      customer.setName(requestDTO.name());
      customer.setDocument(requestDTO.document());

      return customer;
    }
    return null;
  }
}
