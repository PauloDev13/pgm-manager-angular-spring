package com.devpgm.pgmmanager.dto.mapper;

import com.devpgm.pgmmanager.dto.installment.ReqInstDTO;
import com.devpgm.pgmmanager.dto.installment.RespAllInstDTO;
import com.devpgm.pgmmanager.dto.installment.RespCreatInstDTO;
import com.devpgm.pgmmanager.model.Installment;
import org.springframework.stereotype.Component;

@Component
public class InstallmentMapper {
    public RespAllInstDTO toRespAllInstDTO(Installment installment) {
        if (installment == null) {
            return null;
        }

        return installment.respAllInstDTO();

    }

    public RespCreatInstDTO toRespCreateInstDTO(Installment installment) {
        if (installment == null) {
            return null;
        }

        return installment.respCreatInstDTO();

    }

    public Installment toEntity(ReqInstDTO installmentReqDTO) {
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
