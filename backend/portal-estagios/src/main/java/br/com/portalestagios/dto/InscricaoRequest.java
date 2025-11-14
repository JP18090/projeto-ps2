package br.com.portalestagios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InscricaoRequest {
    private Long vagaId;
    private Long estudanteId;
}
