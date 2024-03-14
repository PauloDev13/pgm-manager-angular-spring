package com.devpgm.pgmmanager.repository;

import com.devpgm.pgmmanager.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByDocument(String document);
    @Query("SELECT c FROM Customer c WHERE lower(c.name) LIKE concat('%', lower(:query), '%') OR " +
            "c.document LIKE concat('%', lower(:query), '%') ORDER BY c.name ASC")
    Page<Customer> searchPagination(String query, Pageable pageable);
}
