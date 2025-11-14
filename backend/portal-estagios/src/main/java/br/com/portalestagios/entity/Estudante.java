package br.com.portalestagios.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Estudante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "usuario_id", unique = true)
    private Usuario usuario;
    
    private String nome;
    private String cpf;
    private String curso;
    private String email;
    private String telefone;
    
    private List<String> historicoCandidaturas;
    @ManyToMany
    private Set<AreaInteresse> interesses;
    public Set<AreaInteresse> getAreasInteresse() {
        return this.interesses;
    }
}
