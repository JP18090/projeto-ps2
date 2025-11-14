package br.com.portalestagios.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vaga {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private String localizacao;
    private String modalidade; // remoto, presencial, híbrido
    private String cargaHoraria;
    private String requisitos;
    private boolean encerrada = false;

    @ManyToOne
    private AreaInteresse area;

    @ManyToOne
    private Empresa empresa;
}
