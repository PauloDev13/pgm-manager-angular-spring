package com.devpgm.pgmmanager.service;

import com.devpgm.pgmmanager.dto.InstallmentReqDTO;
import com.devpgm.pgmmanager.dto.InstallmentRespDTO;
import com.devpgm.pgmmanager.dto.mapper.InstallmentMapper;
import com.devpgm.pgmmanager.repository.InstallmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstallmentServiceImpl implements InstallmentService {
    private final InstallmentRepository installmentRepository;
    private final InstallmentMapper installmentMapper;

    @Override
    public List<InstallmentRespDTO> installments() {
        return installmentRepository.findAll()
                .stream()
                .map(installmentMapper::toDTO)
                .toList();
    }

    @Override
    public InstallmentRespDTO create(InstallmentReqDTO installmentReqDTO) {
        return installmentMapper.toDTO(installmentRepository.save(installmentMapper.toEntity(installmentReqDTO)));
    }

}
