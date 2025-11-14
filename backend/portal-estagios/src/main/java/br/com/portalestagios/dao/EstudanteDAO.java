package br.com.portalestagios.dao;

import br.com.portalestagios.entity.Estudante;
import br.com.portalestagios.repository.EstudanteRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

@Component
public class EstudanteDAO {
    private final EstudanteRepository repo;

    public EstudanteDAO(EstudanteRepository repo) {
        this.repo = repo;
    }

    public List<Estudante> listar() {
        return repo.findAll();
    }

    public Optional<Estudante> findById(Long id) {
        return repo.findById(id);
    }

    public Estudante salvar(Estudante estudante) {
        return repo.save(estudante);
    }

    public void excluir(Long id) {
        repo.deleteById(id);
    }
}
