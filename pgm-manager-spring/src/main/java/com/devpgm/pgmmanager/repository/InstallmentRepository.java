package com.devpgm.pgmmanager.repository;

import com.devpgm.pgmmanager.model.Installment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InstallmentRepository extends JpaRepository<Installment, Long> {
   List<Installment> findBySecretaryAndFinishedIsFalse(String secretary);
   Optional<Installment> findFirstByCustomerIdAndFinishedIsFalse(Long id);
   Optional<Installment> findByBadgeAndSecretaryAndFinishedIsFalse(String badge, String secretary);
}
