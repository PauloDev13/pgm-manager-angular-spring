package com.devpgm.pgmmanager.dto.mapper;

import com.devpgm.pgmmanager.dto.InstallmentRespDTO;
import com.devpgm.pgmmanager.model.Installment;
import org.springframework.stereotype.Component;

@Component
public class InstallmentMapper {
    public InstallmentRespDTO toDTO(Installment installment) {
        if (installment == null) {
            return null;
        }

        return new InstallmentRespDTO(
                installment.getId(),
                installment.getBadge(),
                installment.getSecretary(),
                installment.isFinished(),
                installment.getCreatedAt(),
                installment.getUpdatedAt(),
                installment.getCustomer()
        );
    }

    public Installment toEntity(InstallmentRespDTO installmentRespDTO) {
        if (installmentRespDTO == null) {
            return null;
        }

        Installment installment = new Installment();
        installment.setId(installmentRespDTO.id());
        installment.setBadge(installmentRespDTO.badge());
        installment.setFinished(installmentRespDTO.finished());
        installment.setCreatedAt(installmentRespDTO.createdAt());
        installment.setUpdatedAt(installmentRespDTO.updatedAt());
        installment.setCustomer(installmentRespDTO.customer());

        return installment;
    }
}
