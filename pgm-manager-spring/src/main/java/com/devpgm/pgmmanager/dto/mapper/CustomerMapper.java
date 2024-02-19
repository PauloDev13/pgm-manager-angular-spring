package com.devpgm.pgmmanager.dto.mapper;

import com.devpgm.pgmmanager.dto.CustomerRequestDTO;
import com.devpgm.pgmmanager.dto.CustomerResponseDTO;
import com.devpgm.pgmmanager.dto.InstallmentRespDTO;
import com.devpgm.pgmmanager.model.Customer;
import com.devpgm.pgmmanager.model.Installment;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomerMapper {
    public CustomerResponseDTO toDTO(Customer customer) {
        if (customer == null) {
            return null;
        }

        List<InstallmentRespDTO> installments = customer.getInstallments()
                .stream()
                .map(installment -> new InstallmentRespDTO(
                        installment.getId(),
                        installment.getBadge(),
                        installment.getSecretary(),
                        installment.isFinished(),
                        installment.getCreatedAt(),
                        installment.getUpdatedAt(),
                        installment.getCustomer()
                        )
                ).toList();

        return new CustomerResponseDTO(
                customer.getId(),
                customer.getName(),
                customer.getDocument(),
                customer.getCreatedAt(),
                customer.getUpdatedAt(),
                installments
        );
    }

    public Customer toEntity(CustomerResponseDTO customerResponseDTO) {
        if (customerResponseDTO == null) {
            return null;
        }

        Customer customer = new Customer();

        if (customerResponseDTO.id() != null) {
            customer.setId(customerResponseDTO.id());
        }

        customer.setName(customerResponseDTO.name());
        customer.setDocument(customerResponseDTO.document());
        customer.setCreatedAt(customerResponseDTO.createdAt());
        customer.setUpdatedAt(customerResponseDTO.updatedAt());

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

    public Customer toEntity(CustomerRequestDTO requestDTO) {
        if (requestDTO == null) {
            return null;
        }

        Customer customer = new Customer();

        if(requestDTO.id() != null) {
            customer.setId(requestDTO.id());
        }
        customer.setName(requestDTO.name());
        customer.setDocument(requestDTO.document());

        List<Installment> installmentList = requestDTO.installments()
                .stream()
                .map(installmentRespDTO -> {
                    var installment = new Installment();
                    installment.setId(installmentRespDTO.id());
                    installment.setBadge(installmentRespDTO.badge());
                    installment.setCustomer(customer);
                    return installment;
                }).toList();
        customer.setInstallments(installmentList);

        return customer;
    }
}
