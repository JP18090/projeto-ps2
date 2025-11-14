package br.com.portalestagios.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InscricaoResponse {
    private Long id;
    private Long vagaId;
    private String vagaTitulo;
    private String empresaNome;
    private Long estudanteId;
    private String estudanteNome;
}
