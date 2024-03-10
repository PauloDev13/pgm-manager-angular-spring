package com.devpgm.pgmmanager;

import com.devpgm.pgmmanager.model.Customer;
import com.devpgm.pgmmanager.model.Installment;
import com.devpgm.pgmmanager.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PgmManagerSpringApplication {

  public static void main(String[] args) {
    SpringApplication.run(PgmManagerSpringApplication.class, args);
  }

  @Bean
  CommandLineRunner initDatabase(CustomerRepository customerRepository) {
    return args -> {
      customerRepository.deleteAll();

      Customer customer = new Customer();
      customer.setName("Maria Fernanda");
      customer.setDocument("22222222222");

      Customer customer2 = new Customer();
      customer2.setName("Paulo Roberto");
      customer2.setDocument("11111111111");


      Installment i = new Installment();
      i.setSecretary("PGM");
      i.setBadge("02");
      i.setCustomer(customer);
      customer.add(i);

      Installment i2 = new Installment();
      i2.setSecretary("SEMAD");
      i2.setBadge("04");
      i2.setCustomer(customer2);
      customer2.add(i2);

      customerRepository.save(customer);
      customerRepository.save(customer2);
    };
  }

}
