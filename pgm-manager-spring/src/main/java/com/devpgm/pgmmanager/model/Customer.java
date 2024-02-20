package com.devpgm.pgmmanager.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    @Length(min = 5)
    @Column(nullable = false)
    private String name;

    @NotNull
    @NotBlank
    @Length(max = 11)
    @Column(nullable = false, length = 11, unique = true)
    private String document;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "customer")
    private List<Installment> installments = new ArrayList<>();

    public void add(Installment installment) {
        if (installment != null) {
            if (installments == null) {
                installments = new ArrayList<>();
            }
            installments.add(installment);
            installment.setCustomer(this);
        }
    }
}