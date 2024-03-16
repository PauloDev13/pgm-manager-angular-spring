package com.devpgm.pgmmanager.model;

import com.devpgm.pgmmanager.dto.InstallmentDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Validated
@Table(name = "customer")
public class Customer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Nome não pode ser vazio")
  @NotNull(message = "Nome é obrigatório")
  @Length(min = 5, message = "Nome deve ter no mínimo, 5 caracteres")
  @Column(nullable = false)
  private String name;

  @NotNull(message = "DPF é obrigatório")
  @NotBlank(message = "CPF não pode ser vazio")
  @Length(min = 11, max = 11, message = "CPF deve ter 11 caracteres somente números")
  @Column(nullable = false, length = 11, unique = true)
  private String document;

  @CreationTimestamp
  @Column(name = "created_at")
  private Date createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private Date updatedAt;

  @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL,
              orphanRemoval = true, mappedBy = "customer")
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

  public List<InstallmentDTO> listInstallmentDTO() {
    return installments
        .stream()
        .map(
            installment ->
                new InstallmentDTO(
                    installment.getId(),
                    installment.getBadge(),
                    installment.getSecretary(),
                    installment.isFinished(),
                    installment.getDuration(),
                    installment.getCreatedAt(),
                    installment.getUpdatedAt()
                )
        ).toList();
  }
}