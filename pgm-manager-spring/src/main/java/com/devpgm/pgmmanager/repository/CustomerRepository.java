package com.devpgm.pgmmanager.repository;

import com.devpgm.pgmmanager.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
