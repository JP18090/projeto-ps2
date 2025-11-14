package br.com.portalestagios.service;

import br.com.portalestagios.dao.AreaInteresseDAO;
import br.com.portalestagios.entity.AreaInteresse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AreaInteresseService {

    private final AreaInteresseDAO areaInteresseDAO;

    @Autowired
    public AreaInteresseService(AreaInteresseDAO areaInteresseDAO) {
        this.areaInteresseDAO = areaInteresseDAO;
    }

    public List<AreaInteresse> findAll() {
        return areaInteresseDAO.findAll();
    }

    public Optional<AreaInteresse> findById(Long id) {
        return areaInteresseDAO.findById(id);
    }

    public AreaInteresse save(AreaInteresse areaInteresse) {
        return areaInteresseDAO.save(areaInteresse);
    }

    public Optional<AreaInteresse> update(Long id, AreaInteresse areaInteresse) {
        return areaInteresseDAO.findById(id).map(existing -> {
            areaInteresse.setId(existing.getId());
            return areaInteresseDAO.save(areaInteresse);
        });
    }

    public boolean delete(Long id) {
        if (areaInteresseDAO.findById(id).isPresent()) {
            areaInteresseDAO.deleteById(id);
            return true;
        }
        return false;
    }
}