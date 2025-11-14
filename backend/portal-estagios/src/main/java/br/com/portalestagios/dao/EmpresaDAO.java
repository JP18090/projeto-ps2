package br.com.portalestagios.dao;

import br.com.portalestagios.entity.Empresa;
import br.com.portalestagios.repository.EmpresaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class EmpresaDAO {
    private final EmpresaRepository repo;

    public EmpresaDAO(EmpresaRepository repo) {
        this.repo = repo;
    }

    public List<Empresa> listar() { return repo.findAll(); }
    public Empresa salvar(Empresa empresa) { return repo.save(empresa); }
    public void excluir(Long id) { repo.deleteById(id); }
}
