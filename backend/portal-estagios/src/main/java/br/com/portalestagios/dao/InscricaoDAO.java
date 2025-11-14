package br.com.portalestagios.dao;

import br.com.portalestagios.entity.Inscricao;
import br.com.portalestagios.repository.InscricaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component

public class InscricaoDAO {

    @Autowired
    private InscricaoRepository inscricaoRepository;

    public List<Inscricao> findAll() {
        return inscricaoRepository.findAll();
    }

    public Optional<Inscricao> findById(Long id) {
        return inscricaoRepository.findById(id);
    }

    public Inscricao save(Inscricao inscricao) {
        return inscricaoRepository.save(inscricao);
    }

    public void deleteById(Long id) {
        inscricaoRepository.deleteById(id);
    }
}
