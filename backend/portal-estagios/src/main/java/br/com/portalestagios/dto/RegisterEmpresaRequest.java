package br.com.portalestagios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterEmpresaRequest {
    private String nome;
    private String email;
    private String senha;
    private String cnpj;
    private String telefone;
    private String endereco;
    private List<Long> areasAtuacao;
}
