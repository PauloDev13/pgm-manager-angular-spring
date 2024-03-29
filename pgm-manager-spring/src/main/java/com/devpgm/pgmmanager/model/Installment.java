package com.devpgm.pgmmanager.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "Installment")
public class Installment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull(message = "Nº do crachá é obrigatório")
  @NotBlank(message = "Nº do crachá não pode ser vazio")
  @Length(max = 5, message = "Nº do crachá de ter no máximo, 5 caracteres")
  @Column(nullable = false, length = 5)
  private String badge;

  @NotNull(message = "Secretaria é obrigatório")
  @NotBlank(message = "Secretaria não pode ser vazio")
  @Length(min = 2, max = 50, message = "Secretaria deve ter entre 2 e 50 caracteres")
  @Column(nullable = false, length = 100)
  private String secretary;

  private boolean finished;

  private int duration;

  @CreationTimestamp
  @Column(name = "created_at")
  private Date createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private Date updatedAt;

  @NotNull(message = "O ID do cliente é obrigatório")
  @ManyToOne(optional = false)
  @JoinColumn(name = "customer_id", nullable = false)
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private Customer customer;

  @PrePersist
  private void setStatus() {
    finished = false;
  }
}
