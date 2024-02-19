package com.devpgm.pgmmanager.repository;

import com.devpgm.pgmmanager.model.Installment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstallmentRepository extends JpaRepository<Installment, Long> {
}
