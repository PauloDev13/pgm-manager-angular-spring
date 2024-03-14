package com.devpgm.pgmmanager.repository;

import com.devpgm.pgmmanager.model.Installment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InstallmentRepository extends JpaRepository<Installment, Long> {
   List<Installment> findBySecretaryAndFinishedIsFalse(String secretary);
   Optional<Installment> findFirstByCustomerId(Long id);
   Optional<Installment> findByBadgeAndSecretaryAndFinishedIsFalse(String badge, String secretary);

   @Query("SELECT i FROM Installment i INNER JOIN Customer c ON c.id = i.customer.id " +
           "WHERE lower(c.name) LIKE concat('%', lower(:query), '%') OR " +
           "c.document LIKE concat('%', lower(:query), '%') ORDER BY i.createdAt DESC")
   Page<Installment> searchPagination(String query, Pageable pageable);
}
