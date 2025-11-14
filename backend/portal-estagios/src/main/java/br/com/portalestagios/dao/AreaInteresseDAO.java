package br.com.portalestagios.dao;

import br.com.portalestagios.entity.AreaInteresse;
import br.com.portalestagios.repository.AreaInteresseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class AreaInteresseDAO {

    @Autowired
    private AreaInteresseRepository areaInteresseRepository;

    public List<AreaInteresse> findAll() {
        return areaInteresseRepository.findAll();
    }

    public Optional<AreaInteresse> findById(Long id) {
        return areaInteresseRepository.findById(id);
    }

    public AreaInteresse save(AreaInteresse areaInteresse) {
        return areaInteresseRepository.save(areaInteresse);
    }

    public void deleteById(Long id) {
        areaInteresseRepository.deleteById(id);
    }
}