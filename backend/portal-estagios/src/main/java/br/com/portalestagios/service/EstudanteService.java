package br.com.portalestagios.service;

import br.com.portalestagios.entity.Estudante;
import br.com.portalestagios.repository.EstudanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class EstudanteService {

    @Autowired
    private EstudanteRepository estudanteRepository;
    public List<Estudante> findAll() {
        return estudanteRepository.findAll();
    }

    public Optional<Estudante> findById(Long id) {
        return estudanteRepository.findById(id);
    }

    public Estudante save(Estudante estudante) {
        return estudanteRepository.save(estudante);
    }

    public Optional<Estudante> update(Long id, Estudante estudante) {
        return estudanteRepository.findById(id).map(existing -> {
            estudante.setId(existing.getId());
            return estudanteRepository.save(estudante);
        });
    }

    public boolean delete(Long id) {
        if (estudanteRepository.existsById(id)) {
            estudanteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
