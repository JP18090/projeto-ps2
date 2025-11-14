package br.com.portalestagios.dao;

import br.com.portalestagios.entity.Vaga;
import br.com.portalestagios.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class VagaDAO {

    @Autowired
    private VagaRepository VagaRepository;

    public List<Vaga> findAll() {
        return VagaRepository.findAll();
    }

    public Optional<Vaga> findById(Long id) {
        return VagaRepository.findById(id);
    }

    public Vaga save(Vaga Vaga) {
        return VagaRepository.save(Vaga);
    }

    public void deleteById(Long id) {
        VagaRepository.deleteById(id);
    }
}