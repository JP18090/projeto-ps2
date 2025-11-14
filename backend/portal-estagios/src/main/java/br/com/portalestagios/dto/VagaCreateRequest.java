package br.com.portalestagios.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VagaCreateRequest {
    private String titulo;
    private String descricao;
    private Long areaId;
    private String localizacao;
    private String modalidade;
    private String cargaHoraria;
    private String requisitos;
    private Long empresaId;
}
