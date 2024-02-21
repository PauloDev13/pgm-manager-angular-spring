package com.devpgm.pgmmanager.dto.mapper;

import com.devpgm.pgmmanager.dto.installment.InstallmentReqDTO;
import com.devpgm.pgmmanager.dto.installment.InstallmentRespDTO;
import com.devpgm.pgmmanager.model.Installment;
import org.springframework.stereotype.Component;

@Component
public class InstallmentMapper {
    public InstallmentRespDTO toDTO(Installment installment) {
        if (installment == null) {
            return null;
        }

        return installment.listInstallmentDTO();

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
