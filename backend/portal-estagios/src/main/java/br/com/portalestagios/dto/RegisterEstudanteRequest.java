package br.com.portalestagios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterEstudanteRequest {
    private String nome;
    private String email;
    private String senha;
    private String cpf;
    private String curso;
    private String telefone;
    private List<Long> interesses;
}
