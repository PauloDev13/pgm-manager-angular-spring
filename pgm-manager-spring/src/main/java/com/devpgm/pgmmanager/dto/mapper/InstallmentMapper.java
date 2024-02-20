package com.devpgm.pgmmanager.dto.mapper;

import com.devpgm.pgmmanager.dto.InstallmentReqDTO;
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
                installment.getDuration(),
                installment.getCreatedAt(),
                installment.getUpdatedAt(),
                installment.getCustomer()
        );
    }

    public Installment toEntity(InstallmentReqDTO installmentReqDTO) {
        if (installmentReqDTO == null) {
            return null;
        }

        Installment installment = new Installment();
        installment.setId(installmentReqDTO.id());
        installment.setBadge(installmentReqDTO.badge());
        installment.setSecretary(installmentReqDTO.secretary());
        installment.setCustomer(installmentReqDTO.customer());

        return installment;
    }
}
