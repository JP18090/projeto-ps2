package br.com.portalestagios.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    private Long usuarioId;
    private Long estudanteId;
    private Long empresaId;
    private String nome;
    private String email;
    private String perfil;
}
