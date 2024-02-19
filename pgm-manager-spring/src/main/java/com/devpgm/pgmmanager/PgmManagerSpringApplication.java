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
    CommandLineRunner initDatabase(CustomerRepository customerRepository){
        return args -> {
            customerRepository.deleteAll();

            Customer customer = new Customer();
            customer.setName("Paulo Roberto");
            customer.setDocument("11111111111");


            Installment i = new Installment();
            i.setSecretary("PGMNET");
            i.setBadge("02");
            i.setCustomer(customer);
            customer.add(i);

            Installment i2 = new Installment();
            i2.setSecretary("SEMAD");
            i2.setBadge("04");
            i2.setCustomer(customer);
            customer.add(i2);

            customerRepository.save(customer);
        };
    }

}
